import { notFound } from "next/navigation";
import { supportedLocales, type Locale } from "@/types/locale";

export { supportedLocales };
export type { Locale };

export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  it: "Italiano"
};

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  it: "it"
};

export function isLocale(value: string | undefined): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function assertLocale(value: string | undefined): Locale {
  if (!isLocale(value)) {
    notFound();
  }

  return value;
}

