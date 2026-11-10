import "server-only";
import { createSign } from "node:crypto";
import { GalleryError, getDriveConfig } from "./config";
import { DRIVE_FOLDER_TYPE, type DriveFile } from "./policy";

type DriveConfig = NonNullable<ReturnType<typeof getDriveConfig>> & { signal?: AbortSignal; budget?: { remaining: number } };
let token: { key: string; value: string; expiresAt: number } | undefined;
let pendingToken: { key: string; promise: Promise<string> } | undefined;

async function createAccessToken(config: DriveConfig) {
  const now = Math.floor(Date.now() / 1000);
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: config.email,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  })}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const assertion = `${unsigned}.${signer.sign(config.privateKey, "base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
    signal: config.signal ? AbortSignal.any([config.signal, AbortSignal.timeout(12000)]) : AbortSignal.timeout(12000)
  });
  if (!response.ok) throw new GalleryError("UPSTREAM");
  const result = await response.json() as { access_token?: string; expires_in?: number };
  if (!result.access_token) throw new GalleryError("UPSTREAM");
  token = { key: config.cacheKey, value: result.access_token, expiresAt: Date.now() + (result.expires_in ?? 3600) * 1000 - 60000 };
  return result.access_token;
}

export async function driveFetch(config: DriveConfig, url: URL) {
  if (config.budget && config.budget.remaining-- <= 0) throw new GalleryError("UPSTREAM");
  if (url.origin !== "https://www.googleapis.com" || !url.pathname.startsWith("/drive/v3/files")) {
    throw new GalleryError("UPSTREAM");
  }
  if (!token || token.key !== config.cacheKey || token.expiresAt <= Date.now()) {
    if (!pendingToken || pendingToken.key !== config.cacheKey) {
      pendingToken = { key: config.cacheKey, promise: createAccessToken(config) };
    }
    try { await pendingToken.promise; } finally { pendingToken = undefined; }
  }
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token!.value}` },
    cache: "no-store",
    redirect: "error",
    signal: config.signal ? AbortSignal.any([config.signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000)
  });
  if (response.status === 404 || response.status === 403) throw new GalleryError("NOT_FOUND");
  if (!response.ok) throw new GalleryError("UPSTREAM");
  return response;
}

const FILE_FIELDS = "id,name,mimeType,size,parents,trashed,modifiedTime,description";

export async function readDriveFile(config: DriveConfig, id: string) {
  const url = new URL(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}`);
  url.search = new URLSearchParams({ fields: FILE_FIELDS, supportsAllDrives: "true" }).toString();
  return (await driveFetch(config, url)).json() as Promise<DriveFile>;
}

export async function listDriveFiles(config: DriveConfig, folderId: string, folders: boolean, limit: number) {
  const files: DriveFile[] = [];
  const seenTokens = new Set<string>();
  let pageToken = "";
  // The safety limit prevents unbounded API calls on unexpectedly large folders.
  for (let page = 0; page < 20; page++) {
    const url = new URL("https://www.googleapis.com/drive/v3/files");
    url.search = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false and ${folders
        ? `mimeType = '${DRIVE_FOLDER_TYPE}'`
        : "(mimeType = 'image/jpeg' or mimeType = 'image/png' or mimeType = 'image/webp')"}`,
      fields: `nextPageToken,incompleteSearch,files(${FILE_FIELDS})`,
      orderBy: "name_natural",
      pageSize: "100",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
      ...(pageToken ? { pageToken } : {})
    }).toString();
    const data = await (await driveFetch(config, url)).json() as {
      files?: DriveFile[]; nextPageToken?: string; incompleteSearch?: boolean;
    };
    if (data.incompleteSearch) throw new GalleryError("UPSTREAM");
    files.push(...(data.files ?? []));
    if (files.length >= limit) return { files: files.slice(0, limit), limited: files.length > limit || Boolean(data.nextPageToken) };
    if (!data.nextPageToken) return { files, limited: false };
    if (seenTokens.has(data.nextPageToken)) throw new GalleryError("UPSTREAM");
    seenTokens.add(data.nextPageToken);
    pageToken = data.nextPageToken;
  }
  return { files, limited: true };
}
