import type { z } from "zod";
import type { inscricaoSchema } from "@/lib/validations/inscricao.schema";

export type InscricaoFormData = z.infer<typeof inscricaoSchema>;

export type InscricaoStatus = "aguardando_pagamento" | "confirmada" | "cancelada";

export type InscricaoCreationResult = {
  inscricaoId: string;
  status: InscricaoStatus;
  redirectUrl: string;
};

export type RegistrationCopy = {
  languageLabels: Record<"en" | "pt" | "it", string>;
  required: string;
  submitting: string;
  submit: string;
  remove: string;
  fileButton: string;
  hero: string[];
  fields: Record<string, string>;
  yesNo: string[];
  sexoOptions: string[];
  estadoCivilOptions: string[];
  cargoOptions: string[];
  areaAtuacaoOptions: string[];
  modalidadeParticipacaoOptions: string[];
  specialNeedsOptions: string[];
  preferredLanguageOptions: string[];
};

