import { AppError } from "@/lib/api/errors";

const maxAttachmentBytes = 25 * 1024 * 1024;
const allowedTypes = new Set(["application/pdf"]);

export type StoredAttachment = {
  filename: string;
  size: number;
  content: Buffer;
};

export async function validateAndPrepareAttachments(files: File[]): Promise<StoredAttachment[]> {
  const totalAttachmentBytes = files.reduce((total, file) => total + file.size, 0);

  if (totalAttachmentBytes > maxAttachmentBytes) {
    throw new AppError("Os anexos ultrapassam 25MB. Reduza os arquivos e tente novamente.", 413);
  }

  for (const file of files) {
    if (!allowedTypes.has(file.type) && !file.name.toLowerCase().endsWith(".pdf")) {
      throw new AppError("Envie apenas arquivos PDF na submissão acadêmica.", 415);
    }
  }

  return Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      size: file.size,
      content: Buffer.from(await file.arrayBuffer())
    }))
  );
}

