import { getPhotoCatalog } from "@/lib/congresso/photos";
import { logGalleryError } from "@/lib/congresso/config";
import { pageItems, PHOTO_PAGE_SIZE, readPage } from "@/lib/congresso/policy";
import type { PhotoGalleryData } from "@/types/congresso";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  let page: number;
  try { page = readPage(params.get("page")); } catch {
    return Response.json({ error: "Página inválida." }, { status: 400 });
  }
  const day = params.get("day");
  if (day && day.length > 120) return Response.json({ error: "Dia inválido." }, { status: 400 });
  try {
    const catalog = await getPhotoCatalog();
    const data: PhotoGalleryData = catalog ? {
      status: "ready",
      ...pageItems(day ? catalog.items.filter((item) => item.day === day) : catalog.items, page, PHOTO_PAGE_SIZE),
      days: [...new Set(catalog.items.flatMap((item) => item.day ? [item.day] : []))].sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true })),
      limited: catalog.limited
    } : { status: "unconfigured", items: [], days: [] };
    return Response.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    logGalleryError("photos", error);
    return Response.json({ status: "unavailable", items: [], days: [] } satisfies PhotoGalleryData,
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "60" } });
  }
}
