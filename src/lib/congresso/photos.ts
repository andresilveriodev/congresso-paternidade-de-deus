import "server-only";
import { unstable_cache } from "next/cache";
import sharp from "sharp";
import { congressPhotos } from "@/content/congress-photos";
import type { CongressPhoto } from "@/types/congresso";
import { GalleryError, getDriveConfig } from "./config";
import { driveFetch, listDriveFiles, readDriveFile } from "./google-drive";
import { GALLERY_REVALIDATE_SECONDS, isAllowedPhoto, isAuthorizedPhoto, isDriveId, MAX_PHOTO_BYTES, photoTitle } from "./policy";

const readCatalog = unstable_cache(async (_sourceKey: string) => {
  const source = getDriveConfig();
  if (!source) throw new GalleryError("CONFIGURATION");
  const config = { ...source, signal: AbortSignal.timeout(25000), budget: { remaining: 45 } };
  const root = await readDriveFile(config, config.folderId);
  if (root.trashed || root.mimeType !== "application/vnd.google-apps.folder") throw new GalleryError("CONFIGURATION");
  const folders = await listDriveFiles(config, config.folderId, true, 30);
  const sources = [{ id: config.folderId, day: undefined as string | undefined },
    ...folders.files.filter((folder) => isDriveId(folder.id)).map((folder) => ({ id: folder.id, day: folder.name.slice(0, 120) }))];
  const items: CongressPhoto[] = [];
  let limited = folders.limited;
  for (const source of sources) {
    const result = await listDriveFiles(config, source.id, false, 2000 - items.length);
    limited ||= result.limited;
    for (const file of result.files.filter(isAllowedPhoto)) {
      const title = photoTitle(file.name);
      const version = file.modifiedTime ? `&v=${encodeURIComponent(file.modifiedTime)}` : "";
      const path = `/api/congresso/fotos/${encodeURIComponent(file.id)}`;
      items.push({
        id: file.id, title, day: source.day, modifiedTime: file.modifiedTime,
        alt: file.description?.trim().slice(0, 300) || `${title}${source.day ? ` — ${source.day}` : ""}`,
        thumbnailUrl: `${path}?size=thumbnail${version}`, imageUrl: `${path}?size=large${version}`
      });
    }
    if (items.length >= 2000) { limited = true; break; }
  }
  return { items: [...new Map(items.map((item) => [item.id, item])).values()], limited };
}, ["congress-photo-catalog-v1"], { revalidate: GALLERY_REVALIDATE_SECONDS });

export async function getPhotoCatalog() {
  const config = getDriveConfig();
  if (!config) return { items: congressPhotos, limited: false };
  const catalog = await readCatalog(config.cacheKey);
  return { ...catalog, items: [...congressPhotos, ...catalog.items] };
}

export async function getPhotoBytes(id: string, thumbnail: boolean) {
  const source = getDriveConfig();
  if (!source || !isDriveId(id)) throw new GalleryError("NOT_FOUND");
  const config = { ...source, signal: AbortSignal.timeout(25000) };
  const file = await readDriveFile(config, id);
  if (!await isAuthorizedPhoto(file, config.folderId, (parent) => readDriveFile(config, parent))) {
    throw new GalleryError("NOT_FOUND");
  }
  const url = new URL(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}`);
  url.search = new URLSearchParams({ alt: "media", supportsAllDrives: "true" }).toString();
  const response = await driveFetch(config, url);
  const contentLength = Number(response.headers.get("content-length"));
  if (contentLength > MAX_PHOTO_BYTES || !response.body) throw new GalleryError("INVALID_IMAGE");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_PHOTO_BYTES) throw new GalleryError("INVALID_IMAGE");
      chunks.push(value);
    }
  } finally { await reader.cancel().catch(() => {}); }
  try {
    // Re-encoding validates the file and strips EXIF/GPS metadata before publication.
    return await sharp(Buffer.concat(chunks), { limitInputPixels: 40_000_000, animated: false })
      .rotate().resize({ width: thumbnail ? 640 : 1920, height: thumbnail ? 480 : 1920, fit: thumbnail ? "cover" : "inside", withoutEnlargement: true })
      .webp({ quality: thumbnail ? 76 : 85 }).toBuffer();
  } catch { throw new GalleryError("INVALID_IMAGE"); }
}
