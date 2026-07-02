"use client";

import type { Locale } from "@/types/locale";

const localeStorageKey = "paternidade-locale";

export function saveLocale(locale: Locale) {
  window.localStorage.setItem(localeStorageKey, locale);
  document.documentElement.lang = locale === "pt" ? "pt-BR" : locale;
}

export function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(localeStorageKey);
  return stored === "en" || stored === "it" || stored === "pt" ? stored : "pt";
}

