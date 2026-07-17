"use client";

import { Locale, localeNames } from "@/lib/i18n";
import { supportedLocales } from "@/types/locale";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
};

export function LanguageSwitch({ locale, onChange, label }: Props) {
  const currentIndex = supportedLocales.indexOf(locale);
  const nextLocale = supportedLocales[(currentIndex + 1) % supportedLocales.length];

  return (
    <div className="language-switch" aria-label={label}>
      <button type="button" onClick={() => onChange(nextLocale)}>
        <span>{label}</span>
        <strong>{localeNames[locale]}</strong>
      </button>
      <div className="language-options">
        {supportedLocales.map((item) => (
          <button
            aria-pressed={locale === item}
            key={item}
            onClick={() => onChange(item)}
            type="button"
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
