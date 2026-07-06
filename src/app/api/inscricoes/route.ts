import { AppError } from "@/lib/api/errors";
import { apiError, apiSuccess } from "@/lib/api/responses";
import { createInscricao } from "@/lib/services/inscricao.service";
import { validateAndPrepareAttachments } from "@/lib/services/storage.service";
import { inscricaoSchema, zodIssuesToFieldErrors } from "@/lib/validations/inscricao.schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = getPayload(formData);
    const files = formData.getAll("arquivos").filter((file): file is File => file instanceof File);
    const parsed = inscricaoSchema.safeParse(payload);

    if (!parsed.success) {
      return apiError("Revise os campos obrigatórios antes de continuar.", 400, zodIssuesToFieldErrors(parsed.error));
    }

    const attachments = await validateAndPrepareAttachments(files);
    const data = await createInscricao(parsed.data, attachments);

    return apiSuccess("Inscrição recebida. Prossiga para o pagamento.", data);
  } catch (error) {
    console.error("Erro ao criar inscrição:", error);

    if (error instanceof AppError) {
      return apiError(error.message, error.status, error.errors);
    }

    return apiError("Não foi possível realizar a inscrição agora. Tente novamente em alguns minutos.", 500);
  }
}

function getPayload(formData: FormData) {
  const payload: Record<string, string | string[]> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      continue;
    }

    const textValue = String(value).trim();
    const currentValue = payload[key];

    if (Array.isArray(currentValue)) {
      currentValue.push(textValue);
    } else if (currentValue) {
      payload[key] = [currentValue, textValue];
    } else {
      payload[key] = textValue;
    }
  }

  return payload;
}
