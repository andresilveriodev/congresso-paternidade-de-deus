import type { InscricaoFormData } from "@/types/inscricao";

export async function appendInscricaoToSheet(_payload: InscricaoFormData) {
  // Preparado para integração futura sem acoplar a rota API a detalhes do provedor.
  return { skipped: true };
}

