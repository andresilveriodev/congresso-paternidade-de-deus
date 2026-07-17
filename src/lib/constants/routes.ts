import type { Locale } from "@/types/locale";

export function homePath(locale: Locale) {
  return `/${locale}`;
}

export function registrationPath(locale: Locale) {
  return `/${locale}/inscricao`;
}

export function hotmartCheckoutUrl() {
  return process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL ?? "https://pay.hotmart.com/J106565086L?off=kxryq3he&checkoutMode=10";
}

export function paymentPath(locale: Locale, inscricaoId: string) {
  return `/${locale}/pagamento?inscricaoId=${encodeURIComponent(inscricaoId)}`;
}

export function successPath(locale: Locale) {
  return `/${locale}/inscricao/sucesso`;
}

