import type { Locale } from "@/types/locale";
import * as en from "@/content/en";
import * as es from "@/content/es";
import * as it from "@/content/it";
import * as pt from "@/content/pt";

const dictionaries = { pt, en, es, it };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

