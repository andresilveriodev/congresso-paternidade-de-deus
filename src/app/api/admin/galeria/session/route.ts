import { adminConfig, clearLoginFailures, clientKey, createAdminSession, isGalleryAdmin, isSameOrigin, loginLimited, readLimitedBody, recordLoginFailure, requestOrigin, sessionCookie, verifyAdminPassword } from "@/lib/congresso/admin-auth";
import { uploadStorageMode } from "@/lib/congresso/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };

export function GET(request: Request) {
  const authenticated = isGalleryAdmin(request);
  return Response.json({ authenticated, configured: Boolean(adminConfig()), ...(authenticated ? { storage: uploadStorageMode() } : {}) }, { headers });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Solicitação não autorizada." }, { status: 403, headers });
  const config = adminConfig();
  if (!config) return Response.json({ error: "O acesso ao painel ainda precisa ser configurado." }, { status: 503, headers });
  const key = clientKey(request);
  if (loginLimited(key)) return Response.json({ error: "Muitas tentativas. Aguarde 15 minutos antes de tentar novamente." }, { status: 429, headers: { ...headers, "Retry-After": "900" } });
  let password: unknown;
  try { password = JSON.parse(new TextDecoder().decode(await readLimitedBody(request, 2048))).password; }
  catch { return Response.json({ error: "Informe uma senha válida." }, { status: 400, headers }); }
  if (typeof password !== "string" || !verifyAdminPassword(password, config.passwordHash)) {
    recordLoginFailure(key);
    return Response.json({ error: "Senha incorreta." }, { status: 401, headers });
  }
  clearLoginFailures(key);
  const token = createAdminSession(config.secret, config.passwordHash);
  return Response.json({ authenticated: true, storage: uploadStorageMode() }, { headers: { ...headers, "Set-Cookie": sessionCookie(token, requestOrigin(request)?.startsWith("https:") ?? false) } });
}

export function DELETE(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Solicitação não autorizada." }, { status: 403, headers });
  return Response.json({ authenticated: false }, { headers: { ...headers, "Set-Cookie": sessionCookie("", requestOrigin(request)?.startsWith("https:") ?? false, 0) } });
}
