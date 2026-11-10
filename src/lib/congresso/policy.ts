export const GALLERY_REVALIDATE_SECONDS = 600;
export const PHOTO_PAGE_SIZE = 24;
export const VIDEO_PAGE_SIZE = 6;
export const MAX_PHOTO_BYTES = 20 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
export const DRIVE_FOLDER_TYPE = "application/vnd.google-apps.folder";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  parents?: string[];
  trashed?: boolean;
  modifiedTime?: string;
  description?: string;
};

export function isDriveId(value: string) {
  return /^[\w-]{10,160}$/.test(value);
}

export function isVideoId(value: string) {
  return /^[\w-]{11}$/.test(value);
}

export function isPlaylistId(value: string) {
  return /^[\w-]{10,100}$/.test(value);
}

export function isAllowedPhoto(file: DriveFile) {
  const size = Number(file.size);
  return isDriveId(file.id) && !file.trashed && ALLOWED_IMAGE_TYPES.has(file.mimeType)
    && Number.isSafeInteger(size) && size > 0 && size <= MAX_PHOTO_BYTES;
}

// Recheck live membership before serving bytes, even when the catalogue is cached.
export async function isAuthorizedPhoto(
  file: DriveFile,
  rootId: string,
  readFile: (id: string) => Promise<DriveFile>
) {
  if (!isAllowedPhoto(file) || !file.parents?.length) return false;
  if (file.parents.includes(rootId)) return true;
  for (const parentId of file.parents) {
    if (!isDriveId(parentId)) continue;
    const parent = await readFile(parentId);
    if (!parent.trashed && parent.mimeType === DRIVE_FOLDER_TYPE && parent.parents?.includes(rootId)) {
      return true;
    }
  }
  return false;
}

export function photoTitle(name: string) {
  return name.replace(/\.(jpe?g|png|webp)$/i, "").replace(/[_]+/g, " ").trim().slice(0, 160) || "Foto do Congresso";
}

export function readPage(value: string | null) {
  if (value === null) return 1;
  if (!/^[1-9]\d{0,3}$/.test(value)) throw new Error("INVALID_PAGE");
  return Number(value);
}

export function pageItems<T>(items: T[], page: number, size: number) {
  const offset = (page - 1) * size;
  return { items: items.slice(offset, offset + size), nextPage: offset + size < items.length ? page + 1 : undefined };
}
