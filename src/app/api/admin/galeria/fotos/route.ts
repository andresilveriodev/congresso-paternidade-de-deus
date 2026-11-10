import { revalidateTag } from "next/cache";
import { isGalleryAdmin, isSameOrigin, readLimitedBody } from "@/lib/congresso/admin-auth";
import { MAX_UPLOAD_BYTES, publishUploadedPhoto, UPLOAD_CACHE_TAG } from "@/lib/congresso/upload-storage";
import { logGalleryError } from "@/lib/congresso/config";

export const runtime = "nodejs";
export const maxDuration = 60;
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Solicitação não autorizada." }, { status: 403, headers });
  if (!isGalleryAdmin(request)) return Response.json({ error: "Sua sessão expirou. Entre novamente para enviar fotos." }, { status: 401, headers });
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) return Response.json({ error: "Envie a foto pelo formulário do painel." }, { status: 415, headers });
  try {
    const bytes = await readLimitedBody(request, MAX_UPLOAD_BYTES + 16384);
    const form = await new Response(new Uint8Array(bytes), { headers: { "Content-Type": request.headers.get("content-type") ?? "" } }).formData();
    const file = form.get("file");
    const day = form.get("day");
    if (!(file instanceof File) || (day !== null && (typeof day !== "string" || day.length > 80))) {
      return Response.json({ error: "Selecione uma foto válida." }, { status: 400, headers });
    }
    const result = await publishUploadedPhoto(file, typeof day === "string" ? day.trim() : "");
    revalidateTag(UPLOAD_CACHE_TAG, { expire: 0 });
    return Response.json(result, { status: result.duplicate ? 200 : 201, headers });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNAVAILABLE";
    if (["INVALID_IMAGE", "BODY_TOO_LARGE"].includes(code)) return Response.json({ error: "Não foi possível preparar esta foto. Use JPG, PNG ou WebP de até 20 MB no painel." }, { status: 400, headers });
    if (code === "CATALOG_FULL") return Response.json({ error: "O limite da galeria foi atingido. Fale com o responsável pelo site." }, { status: 409, headers });
    if (code === "STORAGE_UNCONFIGURED") return Response.json({ error: "O armazenamento precisa ser ativado na hospedagem antes do primeiro envio." }, { status: 503, headers });
    logGalleryError("photos", error);
    return Response.json({ error: "Não foi possível publicar a foto agora. Tente novamente." }, { status: 503, headers });
  }
}
