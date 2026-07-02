import type { ReactNode } from "react";
import { assertLocale, supportedLocales } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  assertLocale(locale);

  return children;
}

