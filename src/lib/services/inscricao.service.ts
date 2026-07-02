import { paymentPath } from "@/lib/constants/routes";
import { sendRegistrationEmail } from "@/lib/services/email.service";
import { appendInscricaoToSheet } from "@/lib/services/google-sheets.service";
import type { StoredAttachment } from "@/lib/services/storage.service";
import { sanitizePayload } from "@/lib/utils/sanitize";
import type { InscricaoCreationResult, InscricaoFormData } from "@/types/inscricao";

let counter = 0;

export async function createInscricao(
  payload: InscricaoFormData,
  attachments: StoredAttachment[]
): Promise<InscricaoCreationResult> {
  const sanitizedPayload = sanitizePayload(payload);
  const inscricaoId = createInscricaoId();

  await appendInscricaoToSheet(sanitizedPayload);

  try {
    await sendRegistrationEmail(sanitizedPayload, attachments);
  } catch (error) {
    console.warn("Inscrição criada, mas o e-mail de notificação não foi enviado.", error);
  }

  return {
    inscricaoId,
    status: "aguardando_pagamento",
    redirectUrl: paymentPath(sanitizedPayload.locale, inscricaoId)
  };
}

function createInscricaoId() {
  counter += 1;
  return `INS-2026-${String(counter).padStart(4, "0")}`;
}
