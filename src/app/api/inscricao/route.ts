import { NextResponse } from "next/server";
import { apiError, apiSuccess } from "@/lib/api/responses";
import { sanitizePayload } from "@/lib/utils/sanitize";
import { inscricaoSchema, zodIssuesToFieldErrors } from "@/lib/validations/inscricao.schema";
import type { InscricaoCreationResult, InscricaoFormData } from "@/types/inscricao";

export const runtime = "nodejs";

const brevoEndpoint = "https://api.brevo.com/v3/smtp/email";
const maxAttachmentBytes = 10 * 1024 * 1024;
const allowedTypes = new Set(["application/pdf"]);

const fieldSections = [
  {
    title: "Dados pessoais",
    fields: [
      ["nome", "Nome completo"],
      ["nomeCredencial", "Nome para credencial"],
      ["dataNascimento", "Data de nascimento"],
      ["cpf", "CPF"],
      ["passaporte", "Passaporte"],
      ["nacionalidade", "Nacionalidade"],
      ["sexo", "Sexo"],
      ["estadoCivil", "Estado civil"]
    ]
  },
  {
    title: "Contato",
    fields: [
      ["telefoneWhatsapp", "Telefone/WhatsApp"],
      ["emailContato", "E-mail"],
      ["endereco", "Endereco"],
      ["cidade", "Cidade"],
      ["estado", "Estado"],
      ["paisContato", "Pais"],
      ["cep", "CEP"]
    ]
  },
  {
    title: "Vinculo e modalidade",
    fields: [
      ["cargoFuncao", "Cargo/Funcao"],
      ["areaAtuacao", "Area de atuacao"],
      ["areaOutraQual", "Outra area"],
      ["modalidadeParticipacao", "Modalidade de participacao"],
      ["apresentaraTrabalho", "Vai apresentar trabalho academico"],
      ["tituloTrabalho", "Titulo do trabalho"],
      ["areaTematica", "Area tematica"]
    ]
  },
  {
    title: "Necessidades especiais",
    fields: [
      ["necessidadeEspecifica", "Possui necessidade especifica"],
      ["necessidadeQual", "Qual necessidade"],
      ["necessidadesEspeciais", "Necessita de"]
    ]
  },
  {
    title: "Hospedagem e logistica",
    fields: [
      ["hospedagemNecessita", "Necessita hospedagem"],
      ["chegadaPrevista", "Chegada prevista"],
      ["saidaPrevista", "Saida prevista"],
      ["participaraEventosCulturais", "Eventos culturais"]
    ]
  },
  {
    title: "Idioma, certificacao e termos",
    fields: [
      ["idiomaPreferencial", "Idioma preferencial"],
      ["certificacaoDeseja", "Deseja certificado"],
      ["nomeCertificado", "Nome no certificado"],
      ["autorizacaoImagem", "Autorizacao de imagem"],
      ["cidadeCompromisso", "Cidade do compromisso"],
      ["dataCompromisso", "Data do compromisso"],
      ["assinaturaCompromisso", "Assinatura"],
      ["aceiteTermos", "Aceitou os Termos de Uso"]
    ]
  }
] satisfies Array<{ title: string; fields: Array<[keyof InscricaoFormData, string]> }>;

type BrevoAttachment = {
  name: string;
  content: string;
};

class InscricaoApiError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
    public readonly errors?: Record<string, string>
  ) {
    super(message);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = getPayload(formData);
    const parsed = inscricaoSchema.safeParse(payload);

    if (!parsed.success) {
      return apiError("Revise os campos obrigatorios antes de continuar.", 400, zodIssuesToFieldErrors(parsed.error));
    }

    const files = formData.getAll("arquivos").filter((file): file is File => file instanceof File && file.size > 0);
    const attachments = await validateAndPrepareAttachments(files);
    const data = sanitizePayload(parsed.data);

    await sendBrevoEmail(data, attachments);

    return apiSuccess<InscricaoCreationResult>("Inscricao enviada com sucesso. Redirecionando para o checkout.", {
      inscricaoId: createInscricaoId(),
      status: "aguardando_pagamento",
      redirectUrl: buildHotmartCheckoutUrl(data)
    });
  } catch (error) {
    console.error("Erro ao enviar inscricao pela Brevo:", error);

    if (error instanceof InscricaoApiError) {
      return apiError(error.message, error.status, error.errors);
    }

    return NextResponse.json(
      {
        success: false,
        message: "Nao foi possivel enviar a inscricao agora. Tente novamente em alguns minutos."
      },
      { status: 500 }
    );
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

async function validateAndPrepareAttachments(files: File[]): Promise<BrevoAttachment[]> {
  const totalAttachmentBytes = files.reduce((total, file) => total + file.size, 0);

  if (totalAttachmentBytes > maxAttachmentBytes) {
    throw new InscricaoApiError("O PDF ultrapassa 10MB. Reduza o arquivo e tente novamente.", 413, {
      arquivos: "O PDF ultrapassa 10MB."
    });
  }

  for (const file of files) {
    if (!allowedTypes.has(file.type) && !file.name.toLowerCase().endsWith(".pdf")) {
      throw new InscricaoApiError("Envie apenas arquivos PDF.", 415, {
        arquivos: "Envie apenas arquivos PDF."
      });
    }
  }

  return Promise.all(
    files.map(async (file) => ({
      name: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64")
    }))
  );
}

async function sendBrevoEmail(payload: InscricaoFormData, attachments: BrevoAttachment[]) {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "Congresso Paternidade de Deus";
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
  const destinationEmail = process.env.INSCRICAO_EMAIL_DESTINO?.trim();
  const copyEmail = process.env.INSCRICAO_EMAIL_COPIA?.trim();
  const backupEmail = process.env.INSCRICAO_EMAIL_BACKUP?.trim();

  if (!apiKey) {
    throw new Error("BREVO_API_KEY precisa estar configurada.");
  }

  if (!senderEmail) {
    throw new Error("BREVO_SENDER_EMAIL precisa estar configurada.");
  }

  if (!destinationEmail) {
    throw new Error("INSCRICAO_EMAIL_DESTINO precisa estar configurado.");
  }

  const bccRecipients = [
    ...(copyEmail
      ? [
          {
            email: copyEmail,
            name: "Cópia Inscrições"
          }
        ]
      : []),
    ...(backupEmail
      ? [
          {
            email: backupEmail,
            name: "Backup Inscrições"
          }
        ]
      : [])
  ];

  const brevoPayload = {
    sender: {
      name: senderName,
      email: senderEmail
    },
    to: [
      {
        email: destinationEmail,
        name: "Equipe de Inscrições"
      }
    ],
    ...(bccRecipients.length > 0
      ? {
          bcc: bccRecipients
        }
      : {}),
    replyTo: {
      email: payload.emailContato,
      name: payload.nome
    },
    subject: `Nova inscricao - ${payload.nome}`,
    htmlContent: buildEmailHtml(payload, attachments),
    ...(attachments.length > 0
      ? {
          attachment: attachments
        }
      : {})
  };

  const response = await fetch(brevoEndpoint, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey
    },
    body: JSON.stringify(brevoPayload)
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Erro Brevo:", {
      status: response.status,
      body: errorText
    });

    throw new Error(`Erro Brevo: ${response.status}`);
  }

  return response.json();
}

function buildEmailHtml(payload: InscricaoFormData, attachments: BrevoAttachment[]) {
  const sectionsHtml = fieldSections
    .map((section) => {
      const rows = section.fields
        .map(([key, label]) => buildEmailRow(label, getPayloadValue(payload[key])))
        .filter(Boolean)
        .join("");

      if (!rows) {
        return "";
      }

      return `
        <section style="margin:0 0 24px;">
          <h2 style="margin:0 0 12px;color:#6f4f24;font-size:18px;">${escapeHtml(section.title)}</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>${rows}</tbody>
          </table>
        </section>
      `;
    })
    .join("");

  const attachmentsHtml =
    attachments.length > 0
      ? `
        <section style="margin:0 0 24px;">
          <h2 style="margin:0 0 12px;color:#6f4f24;font-size:18px;">Anexos</h2>
          <ul style="margin:0;padding-left:20px;">
            ${attachments.map((file) => `<li>${escapeHtml(file.name)}</li>`).join("")}
          </ul>
        </section>
      `
      : "";

  return `
    <!doctype html>
    <html lang="pt-BR">
      <body style="margin:0;background:#f7f2e8;color:#21160c;font-family:Arial,Helvetica,sans-serif;">
        <main style="max-width:760px;margin:0 auto;padding:32px 20px;">
          <div style="background:#ffffff;border:1px solid #e8dcc8;border-radius:12px;padding:28px;">
            <p style="margin:0 0 8px;color:#8a6a36;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">
              Congresso Pai Eterno
            </p>
            <h1 style="margin:0 0 24px;color:#2d1b0d;font-size:26px;line-height:1.2;">
              Nova inscricao recebida: ${escapeHtml(payload.nome)}
            </h1>
            ${sectionsHtml}
            ${attachmentsHtml}
          </div>
        </main>
      </body>
    </html>
  `;
}

function buildEmailRow(label: string, value: string) {
  if (!value) {
    return "";
  }

  return `
    <tr>
      <th style="width:34%;padding:10px 12px;border:1px solid #eadfce;background:#fbf7ef;color:#4a321c;font-size:13px;text-align:left;vertical-align:top;">
        ${escapeHtml(label)}
      </th>
      <td style="padding:10px 12px;border:1px solid #eadfce;color:#21160c;font-size:14px;line-height:1.5;vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function buildHotmartCheckoutUrl(payload: InscricaoFormData) {
  const checkout = new URL(process.env.HOTMART_CHECKOUT_URL ?? "https://pay.hotmart.com/J106565086L?checkoutMode=10");

  checkout.searchParams.set("checkoutMode", checkout.searchParams.get("checkoutMode") ?? "10");
  addSearchParam(checkout, "name", payload.nome);
  addSearchParam(checkout, "email", payload.emailContato);

  const phone = splitPhone(payload.telefoneWhatsapp);
  addSearchParam(checkout, "phoneac", phone.phoneac);
  addSearchParam(checkout, "phonenumber", phone.phonenumber);

  return checkout.toString();
}

function splitPhone(phoneValue: string) {
  let digits = phoneValue.replace(/\D/g, "");

  if (digits.startsWith("55") && digits.length > 11) {
    digits = digits.slice(2);
  }

  if (digits.length >= 10) {
    return {
      phoneac: digits.slice(0, 2),
      phonenumber: digits.slice(2)
    };
  }

  return {
    phoneac: "",
    phonenumber: digits
  };
}

function addSearchParam(url: URL, key: string, value: string) {
  if (value.trim()) {
    url.searchParams.set(key, value.trim());
  }
}

function getPayloadValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Sim" : "Nao";
  }

  return typeof value === "string" ? value : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function getResponseMessage(response: Response) {
  try {
    const body = await response.json();

    if (typeof body?.message === "string") {
      return body.message;
    }

    if (typeof body?.code === "string") {
      return body.code;
    }

    return JSON.stringify(body);
  } catch {
    return response.statusText;
  }
}

function createInscricaoId() {
  return `INS-${Date.now()}`;
}
