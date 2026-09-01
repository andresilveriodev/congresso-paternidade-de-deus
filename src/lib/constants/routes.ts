import type { Locale } from "@/types/locale";

export function homePath(locale: Locale) {
  return `/${locale}`;
}

export function registrationPath(locale: Locale) {
  return `/${locale}/inscricao`;
}

export function registrationCheckoutUrl() {
  return process.env.NEXT_PUBLIC_REGISTRATION_URL ?? "https://app.ciaticket.com.br/e/1CONGRESSOINTERNACIONAL";
}

export function paymentPath(locale: Locale, inscricaoId: string) {
  return `/${locale}/pagamento?inscricaoId=${encodeURIComponent(inscricaoId)}`;
}

export function successPath(locale: Locale) {
  return `/${locale}/inscricao/sucesso`;
}

