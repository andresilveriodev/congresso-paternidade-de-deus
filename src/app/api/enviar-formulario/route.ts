import { NextResponse } from "next/server";

const requiredFields = [
  "nome",
  "email",
  "telefone",
  "pais",
  "documento",
  "categoria",
  "instituicao"
];

export async function POST(request: Request) {
  const formData = await request.formData();
  const missing = requiredFields.filter((field) => !String(formData.get(field) ?? "").trim());

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, message: "Campos obrigatórios ausentes.", missing },
      { status: 400 }
    );
  }

  const files = formData.getAll("arquivos").filter((file) => file instanceof File);

  const payload = Object.fromEntries(
    Array.from(formData.entries()).filter(([, value]) => !(value instanceof File))
  );

  // Futuro Gmail: usar as variáveis GMAIL_* do backend para enviar um e-mail de confirmação
  // ao inscrito e uma notificação para a comissão organizadora.
  await mockGmailIntegration(payload);

  // Futuro Google Sheets/Drive: usar GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY e GOOGLE_SHEET_ID
  // apenas no backend para registrar os dados e salvar anexos no Drive.
  await mockGoogleWorkspaceIntegration(payload, files as File[]);

  return NextResponse.json({
    ok: true,
    message: "Inscrição recebida com sucesso.",
    receivedFiles: files.length
  });
}

async function mockGmailIntegration(_payload: Record<string, FormDataEntryValue>) {
  return Promise.resolve();
}

async function mockGoogleWorkspaceIntegration(
  _payload: Record<string, FormDataEntryValue>,
  _files: File[]
) {
  return Promise.resolve();
}
