import { Resend } from "resend";
import { siteConfig } from "@/lib/constants/site";
import type { StoredAttachment } from "@/lib/services/storage.service";
import type { InscricaoFormData } from "@/types/inscricao";

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
      ["endereco", "Endereço"],
      ["cidade", "Cidade"],
      ["estado", "Estado"],
      ["paisContato", "País"],
      ["cep", "CEP"]
    ]
  },
  {
    title: "Vínculo e modalidade",
    fields: [
      ["cargoFuncao", "Cargo/Função"],
      ["areaAtuacao", "Área de atuação"],
      ["modalidadeParticipacao", "Modalidade de participação"],
      ["apresentaraTrabalho", "Vai apresentar trabalho acadêmico"],
      ["tituloTrabalho", "Título do trabalho"],
      ["areaTematica", "Área temática"]
    ]
  },
  {
    title: "Logística, idioma e termos",
    fields: [
      ["necessidadeEspecifica", "Possui necessidade específica"],
      ["necessidadeQual", "Qual necessidade"],
      ["hospedagemNecessita", "Necessita hospedagem"],
      ["participaraEventosCulturais", "Eventos culturais"],
      ["idiomaPreferencial", "Idioma preferencial"],
      ["certificacaoDeseja", "Deseja certificado"],
      ["nomeCertificado", "Nome no certificado"],
      ["autorizacaoImagem", "Autorização de imagem"]
    ]
  }
] satisfies Array<{ title: string; fields: Array<[keyof InscricaoFormData, string]> }>;

export async function sendRegistrationEmail(payload: InscricaoFormData, attachments: StoredAttachment[]) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const organizerEmail = process.env.ORGANIZER_EMAIL ?? siteConfig.organizerEmail;

  if (!resendApiKey || !fromEmail) {
    console.warn("RESEND_API_KEY/RESEND_FROM_EMAIL ausentes. E-mail de inscrição não enviado.");
    return;
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: organizerEmail,
    replyTo: payload.emailContato || undefined,
    subject: `Nova inscrição aguardando pagamento - ${payload.nome}`,
    html: buildEmailHtml(payload, attachments),
    attachments: attachments.length > 0 ? attachments.map(({ content, filename }) => ({ content, filename })) : undefined
  });

  if (error) {
    throw new Error(error.message);
  }
}

function buildEmailHtml(payload: InscricaoFormData, attachments: StoredAttachment[]) {
  const sectionsHtml = emailSections
    .map(
      (section) => `
        <section style="margin:0 0 24px;">
          <h2 style="margin:0 0 12px;color:#6f4f24;font-size:18px;">${escapeHtml(section.title)}</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              ${section.fields.map(([key, label]) => buildEmailRow(label, getPayloadValue(payload[key]))).join("")}
            </tbody>
          </table>
        </section>
      `
    )
    .join("");
  const attachmentsHtml =
    attachments.length > 0
      ? `
        <section style="margin:0 0 24px;">
          <h2 style="margin:0 0 12px;color:#6f4f24;font-size:18px;">Anexos</h2>
          <ul style="margin:0;padding-left:20px;">
            ${attachments.map((file) => `<li>${escapeHtml(file.filename)} (${formatBytes(file.size)})</li>`).join("")}
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
              Nova inscrição recebida: ${escapeHtml(payload.nome)}
            </h1>
            <p style="margin:0 0 24px;">Status inicial: <strong>aguardando pagamento</strong>.</p>
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

function getPayloadValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
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

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

