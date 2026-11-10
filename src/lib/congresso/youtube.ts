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
