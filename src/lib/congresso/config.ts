import "server-only";
import { createHash } from "node:crypto";
import { isDriveId, isPlaylistId } from "./policy";

export class GalleryError extends Error {
  constructor(public readonly code: "CONFIGURATION" | "UPSTREAM" | "NOT_FOUND" | "INVALID_IMAGE") {
    super(code);
  }
}

export function getDriveConfig() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim();
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!folderId || !json) return null;
  try {
    const account = JSON.parse(json) as { client_email?: string; private_key?: string };
    if (!isDriveId(folderId) || !account.client_email || !account.private_key) throw new Error();
    return {
      folderId,
      email: account.client_email,
      privateKey: account.private_key.replace(/\\n/g, "\n"),
      cacheKey: createHash("sha256").update(`${folderId}:${json}`).digest("hex")
    };
  } catch {
    throw new GalleryError("CONFIGURATION");
  }
}

export function getYouTubeConfig() {
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID?.trim();
  if (!playlistId) return null;
  if (!isPlaylistId(playlistId)) throw new GalleryError("CONFIGURATION");
  const displayMode = process.env.YOUTUBE_DISPLAY_MODE?.trim() || "playlist";
  if (displayMode !== "playlist" && displayMode !== "cards") throw new GalleryError("CONFIGURATION");
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  return {
    playlistId,
    displayMode,
    apiKey,
    cacheKey: createHash("sha256").update(`${playlistId}:${apiKey ?? ""}`).digest("hex")
  };
}

// Only a short error code is logged. Provider responses can contain credentials or private names.
export function logGalleryError(source: "photos" | "videos", error: unknown) {
  console.warn(`[congresso:${source}]`, error instanceof GalleryError ? error.code : "UNAVAILABLE");
}
