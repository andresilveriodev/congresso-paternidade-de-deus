import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const organizerEmail = process.env.ORGANIZER_EMAIL ?? "congressopaternidadededeus@gmail.com";
const maxAttachmentBytes = 25 * 1024 * 1024;

const requiredFields = [
  { key: "nome", label: "Nome completo" },
  { key: "nomeCredencial", label: "Nome para credencial" },
  { key: "dataNascimento", label: "Data de nascimento" },
  { key: "cpf", label: "CPF" },
  { key: "nacionalidade", label: "Nacionalidade" },
  { key: "sexo", label: "Sexo" },
  { key: "estadoCivil", label: "Estado civil" },
  { key: "telefoneWhatsapp", label: "Telefone/WhatsApp" },
  { key: "emailContato", label: "E-mail" },
  { key: "endereco", label: "Endereco" },
  { key: "cidade", label: "Cidade" },
  { key: "estado", label: "Estado" },
  { key: "paisContato", label: "Pais" },
  { key: "cep", label: "CEP" },
  { key: "cargoFuncao", label: "Cargo/Funcao" },
  { key: "areaAtuacao", label: "Area de atuacao" },
  { key: "modalidadeParticipacao", label: "Modalidade de participacao" },
  { key: "tituloTrabalho", label: "Titulo do trabalho" },
  { key: "areaTematica", label: "Area tematica" },
  { key: "necessidadeEspecifica", label: "Necessidade especifica" },
  { key: "hospedagemNecessita", label: "Hospedagem" },
  { key: "participaraEventosCulturais", label: "Eventos culturais" },
  { key: "idiomaPreferencial", label: "Idioma preferencial" },
  { key: "certificacaoDeseja", label: "Certificacao" },
  { key: "autorizacaoImagem", label: "Autorizacao de imagem" }
];

const emailSections = [
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
    title: "Vinculo eclesial / academico",
    fields: [
      ["cargoFuncao", "Cargo/Funcao"],
      ["areaAtuacao", "Area de atuacao"],
      ["areaOutraQual", "Outra area"]
    ]
  },
  {
    title: "Modalidade e trabalho academico",
    fields: [
      ["modalidadeParticipacao", "Modalidade de participacao"],
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
      ["participaraEventosCulturais", "Participara dos eventos culturais"]
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
      ["assinaturaCompromisso", "Assinatura"]
    ]
  }
] satisfies Array<{ title: string; fields: Array<[string, string]> }>;

type Payload = Record<string, string | string[]>;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = getPayload(formData);
    const files = formData.getAll("arquivos").filter((file): file is File => file instanceof File);
    const missing = requiredFields.filter(({ key }) => !getPayloadValue(payload, key).trim());

    if (missing.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: `Campos obrigatorios ausentes: ${missing.map((field) => field.label).join(", ")}.`,
          missing: missing.map((field) => field.key)
        },
        { status: 400 }
      );
    }

    const totalAttachmentBytes = files.reduce((total, file) => total + file.size, 0);

    if (totalAttachmentBytes > maxAttachmentBytes) {
      return NextResponse.json(
        {
          ok: false,
          message: "Os anexos ultrapassam 25MB. Reduza os arquivos e tente novamente."
        },
        { status: 413 }
      );
    }

    await sendRegistrationEmail(payload, files);

    return NextResponse.json({
      ok: true,
      message: "Inscricao enviada com sucesso.",
      receivedFiles: files.length
    });
  } catch (error) {
    console.error("Erro ao enviar inscricao pelo Resend:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Nao foi possivel enviar a inscricao agora. Tente novamente em alguns minutos."
      },
      { status: 500 }
    );
  }
}

async function sendRegistrationEmail(payload: Payload, files: File[]) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    throw new Error("RESEND_API_KEY e RESEND_FROM_EMAIL precisam estar configurados.");
  }

  const resend = new Resend(resendApiKey);
  const participantName = getPayloadValue(payload, "nome") || "Participante";
  const participantEmail = getPayloadValue(payload, "emailContato");
  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer())
    }))
  );

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: organizerEmail,
    replyTo: participantEmail || undefined,
    subject: `Nova inscricao - ${participantName}`,
    html: buildEmailHtml(payload, files),
    attachments: attachments.length > 0 ? attachments : undefined
  });

  if (error) {
    throw new Error(error.message);
  }
}

function getPayload(formData: FormData): Payload {
  const payload: Payload = {};

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

function buildEmailHtml(payload: Payload, files: File[]) {
  const participantName = escapeHtml(getPayloadValue(payload, "nome") || "Participante");
  const sectionsHtml = emailSections
    .map(
      (section) => `
        <section style="margin:0 0 24px;">
          <h2 style="margin:0 0 12px;color:#6f4f24;font-size:18px;">${escapeHtml(section.title)}</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              ${section.fields
                .map(([key, label]) => buildEmailRow(label, getPayloadValue(payload, key)))
                .join("")}
            </tbody>
          </table>
        </section>
      `
    )
    .join("");

  const attachmentsHtml =
    files.length > 0
      ? `
        <section style="margin:0 0 24px;">
          <h2 style="margin:0 0 12px;color:#6f4f24;font-size:18px;">Anexos</h2>
          <ul style="margin:0;padding-left:20px;">
            ${files
              .map((file) => `<li>${escapeHtml(file.name)} (${formatBytes(file.size)})</li>`)
              .join("")}
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
              I Congresso Internacional de Teologia
            </p>
            <h1 style="margin:0 0 24px;color:#2d1b0d;font-size:26px;line-height:1.2;">
              Nova inscricao recebida: ${participantName}
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
  return `
    <tr>
      <th style="width:34%;padding:10px 12px;border:1px solid #eadfce;background:#fbf7ef;color:#4a321c;font-size:13px;text-align:left;vertical-align:top;">
        ${escapeHtml(label)}
      </th>
      <td style="padding:10px 12px;border:1px solid #eadfce;color:#21160c;font-size:14px;line-height:1.5;vertical-align:top;">
        ${escapeHtml(value || "-")}
      </td>
    </tr>
  `;
}

function getPayloadValue(payload: Payload, key: string) {
  const value = payload[key];

  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }

  return value ?? "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}
