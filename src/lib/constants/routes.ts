import type { Locale } from "@/types/locale";

export function homePath(locale: Locale) {
  return `/${locale}`;
}

export function registrationPath(locale: Locale) {
  return `/${locale}/inscricao`;
}

export function paymentPath(locale: Locale, inscricaoId: string) {
  return `/${locale}/pagamento?inscricaoId=${encodeURIComponent(inscricaoId)}`;
}

export function successPath(locale: Locale) {
  return `/${locale}/inscricao/sucesso`;
}

