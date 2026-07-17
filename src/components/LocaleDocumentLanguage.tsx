"use client";

import { useEffect } from "react";
import { htmlLang } from "@/lib/i18n/locales";
import type { Locale } from "@/types/locale";

export function LocaleDocumentLanguage({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  return null;
}
