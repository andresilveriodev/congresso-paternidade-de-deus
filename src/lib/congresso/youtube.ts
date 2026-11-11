import "server-only";
import { unstable_cache } from "next/cache";
import type { CongressVideo } from "@/types/congresso";
import { GalleryError, getYouTubeConfig } from "./config";
import { GALLERY_REVALIDATE_SECONDS, isVideoId } from "./policy";

type PlaylistItem = {
  snippet?: { title?: string; position?: number; thumbnails?: Record<string, { url?: string }> };
  contentDetails?: { videoId?: string };
};

async function youtubeRequest(resource: string, params: Record<string, string>, apiKey: string, signal: AbortSignal) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${resource}`);
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url, {
    headers: { "X-Goog-Api-Key": apiKey },
    cache: "no-store", signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]), redirect: "error"
  });
  if (!response.ok) throw new GalleryError("UPSTREAM");
  return response.json();
}

function safeThumbnail(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && ["i.ytimg.com", "img.youtube.com"].includes(parsed.hostname) ? url : undefined;
  } catch { return undefined; }
}

function decodeXml(value: string) {
  const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code: string) => {
    if (!code.startsWith("#")) return entities[code.toLowerCase()] ?? entity;
    const point = code.toLowerCase().startsWith("#x") ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : "";
  });
}

// The official public Atom feed provides the playlist's recent videos without a Data API key.
export async function getPublicVideoCatalog(playlistId: string) {
  const url = new URL("https://www.youtube.com/feeds/videos.xml");
  url.searchParams.set("playlist_id", playlistId);
  const response = await fetch(url, { next: { revalidate: 60 }, signal: AbortSignal.timeout(12000), redirect: "error" });
  if (!response.ok) throw new GalleryError("UPSTREAM");
  const xml = await response.text();
  if (!/<feed\b/.test(xml)) throw new GalleryError("UPSTREAM");
  const items: CongressVideo[] = [];
  for (const entry of xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/g)) {
    const id = entry[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry[1].match(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/)?.[1];
    if (!id || !isVideoId(id) || !title || items.some((item) => item.id === id)) continue;
    items.push({ id, title: decodeXml(title).trim().slice(0, 200), position: items.length,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` });
  }
  // YouTube's public feed is limited to the most recent 15 entries; the full playlist remains linked.
  return { items, limited: items.length >= 15 };
}

const readPlaylist = unstable_cache(async (_sourceKey: string) => {
  const config = getYouTubeConfig();
  if (!config?.apiKey) throw new GalleryError("CONFIGURATION");
  const videos: CongressVideo[] = [];
  const signal = AbortSignal.timeout(25000);
  const seenTokens = new Set<string>();
  let pageToken = "";
  for (let page = 0; page < 10; page++) {
    const data = await youtubeRequest("playlistItems", {
      part: "snippet,contentDetails", playlistId: config.playlistId, maxResults: "50",
      fields: "nextPageToken,items(snippet(title,position,thumbnails),contentDetails(videoId))",
      ...(pageToken ? { pageToken } : {})
    }, config.apiKey, signal) as { items?: PlaylistItem[]; nextPageToken?: string };
    const candidates = (data.items ?? []).filter((item) => isVideoId(item.contentDetails?.videoId ?? "")
      && item.snippet?.title && !["Private video", "Deleted video"].includes(item.snippet.title));
    if (candidates.length) {
      const statuses = await youtubeRequest("videos", {
        part: "status", id: candidates.map((item) => item.contentDetails!.videoId).join(","),
        fields: "items(id,status(privacyStatus,embeddable,uploadStatus))"
      }, config.apiKey, signal) as { items?: { id: string; status?: { privacyStatus?: string; embeddable?: boolean; uploadStatus?: string } }[] };
      const allowed = new Set((statuses.items ?? []).filter((item) => item.status?.embeddable
        && ["public", "unlisted"].includes(item.status.privacyStatus ?? "") && item.status.uploadStatus === "processed").map((item) => item.id));
      for (const item of candidates) {
        const id = item.contentDetails!.videoId!;
        if (!allowed.has(id)) continue;
        const thumbnails = item.snippet?.thumbnails;
        videos.push({ id, title: item.snippet!.title!.slice(0, 200), position: item.snippet?.position ?? videos.length,
          thumbnailUrl: safeThumbnail(thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url) });
      }
    }
    if (!data.nextPageToken) return { items: [...new Map(videos.map((video) => [video.id, video])).values()], limited: false };
    if (seenTokens.has(data.nextPageToken)) throw new GalleryError("UPSTREAM");
    seenTokens.add(data.nextPageToken);
    pageToken = data.nextPageToken;
  }
  return { items: [...new Map(videos.map((video) => [video.id, video])).values()], limited: true };
}, ["congress-youtube-playlist-v1"], { revalidate: GALLERY_REVALIDATE_SECONDS });

export function getVideoCatalog() {
  const config = getYouTubeConfig();
  return config?.displayMode === "cards" && config.apiKey ? readPlaylist(config.cacheKey) : null;
}
