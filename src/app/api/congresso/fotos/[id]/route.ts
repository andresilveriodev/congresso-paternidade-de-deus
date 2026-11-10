import { GalleryError, logGalleryError } from "@/lib/congresso/config";
import { getPhotoBytes } from "@/lib/congresso/photos";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const size = new URL(request.url).searchParams.get("size") ?? "thumbnail";
  if (size !== "thumbnail" && size !== "large") return new Response(null, { status: 400 });
  try {
    const bytes = await getPhotoBytes(id, size === "thumbnail");
    return new Response(new Uint8Array(bytes), { headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(bytes.length),
      "Cache-Control": "public, max-age=600, s-maxage=600",
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": "inline"
    } });
  } catch (error) {
    const status = error instanceof GalleryError && error.code === "NOT_FOUND" ? 404 : 503;
    logGalleryError("photos", error);
    return new Response(null, { status, headers: { "Cache-Control": "no-store" } });
  }
}
