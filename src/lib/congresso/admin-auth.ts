import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "congresso_gallery_admin";
export const SESSION_SECONDS = 8 * 60 * 60;

export function hashAdminPassword(password: string, salt = randomBytes(16).toString("hex")) {
  return `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

export function verifyAdminPassword(password: string, stored: string) {
  if (!password || password.length > 256 || !/^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(stored)) return false;
  const [, salt, digest] = stored.split(":");
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(digest, "hex"));
}

function signature(payload: string, secret: string, passwordHash: string) {
  return createHmac("sha256", secret).update(`gallery-admin:${passwordHash}:${payload}`).digest("base64url");
}

export function createAdminSession(secret: string, passwordHash: string, now = Date.now()) {
  const payload = `${Math.floor(now / 1000) + SESSION_SECONDS}.${randomBytes(18).toString("base64url")}`;
  return `${payload}.${signature(payload, secret, passwordHash)}`;
}

export function verifyAdminSession(token: string, secret: string, passwordHash: string, now = Date.now()) {
  if (secret.length < 32 || !passwordHash || token.length > 200) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || !/^\d{10}$/.test(parts[0]) || !/^[\w-]{24}$/.test(parts[1]) || !/^[\w-]{43}$/.test(parts[2])) return false;
  const expires = Number(parts[0]);
  if (expires <= Math.floor(now / 1000) || expires > Math.floor(now / 1000) + SESSION_SECONDS) return false;
  const expected = signature(`${parts[0]}.${parts[1]}`, secret, passwordHash);
  return timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected));
}

export function adminConfig() {
  const passwordHash = process.env.GALLERY_ADMIN_PASSWORD_HASH?.trim() ?? "";
  const secret = process.env.GALLERY_SESSION_SECRET?.trim() ?? "";
  return /^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(passwordHash) && secret.length >= 32 ? { passwordHash, secret } : null;
}

export function isGalleryAdmin(request: Request) {
  const config = adminConfig();
  const token = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return Boolean(config && token && verifyAdminSession(token, config.secret, config.passwordHash));
}

export function requestOrigin(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("host") || url.host;
  if (/[\s/\\?#@]/.test(host)) return null;
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() === "https" ? "https:" : url.protocol;
  try { return new URL(`${protocol}//${host}`).origin; }
  catch { return null; }
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === requestOrigin(request));
}

export function sessionCookie(token: string, secure: boolean, maxAge = SESSION_SECONDS) {
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
}

export function clientKey(request: Request) {
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  return createHash("sha256").update(ip).digest("hex");
}

const attempts = new Map<string, { count: number; expires: number }>();
export function loginLimited(key: string, now = Date.now()) {
  for (const [id, entry] of attempts) if (entry.expires <= now) attempts.delete(id);
  const entry = attempts.get(key);
  return Boolean(entry && entry.count >= 8);
}
export function recordLoginFailure(key: string) {
  const entry = attempts.get(key);
  if (attempts.size > 10000) attempts.delete(attempts.keys().next().value!);
  attempts.set(key, { count: (entry?.count ?? 0) + 1, expires: entry?.expires ?? Date.now() + 15 * 60_000 });
}
export function clearLoginFailures(key: string) { attempts.delete(key); }

export async function readLimitedBody(request: Request, limit: number) {
  if (Number(request.headers.get("content-length")) > limit) throw new Error("BODY_TOO_LARGE");
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > limit) throw new Error("BODY_TOO_LARGE");
      chunks.push(value);
    }
  } finally { await reader.cancel().catch(() => {}); }
  return Buffer.concat(chunks);
}
