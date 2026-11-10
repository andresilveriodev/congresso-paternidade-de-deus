import { getYouTubeConfig, logGalleryError } from "@/lib/congresso/config";
import { pageItems, readPage, VIDEO_PAGE_SIZE } from "@/lib/congresso/policy";
import { getVideoCatalog } from "@/lib/congresso/youtube";
import type { VideoGalleryData } from "@/types/congresso";

export const runtime = "nodejs";

export async function GET(request: Request) {
  let page: number;
  try { page = readPage(new URL(request.url).searchParams.get("page")); } catch {
    return Response.json({ error: "Página inválida." }, { status: 400 });
  }
  try {
    const config = getYouTubeConfig();
    let data: VideoGalleryData = { status: "unconfigured", mode: "playlist", items: [] };
    if (config) {
      // The official playlist is the default, even if a Data API key was saved.
      const catalog = config.displayMode === "cards" ? await getVideoCatalog() : null;
      data = catalog ? { status: "ready", mode: "cards", ...pageItems(catalog.items, page, VIDEO_PAGE_SIZE), limited: catalog.limited }
        : { status: "ready", mode: "playlist", items: [], playlistId: config.playlistId };
    }
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    logGalleryError("videos", error);
    return Response.json({ status: "unavailable", mode: "cards", items: [] } satisfies VideoGalleryData,
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "60" } });
  }
}
