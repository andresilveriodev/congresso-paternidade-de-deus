"use client";

import { Locale, localeNames } from "@/lib/i18n";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
};

export function LanguageSwitch({ locale, onChange, label }: Props) {
  const nextLocale = locale === "pt" ? "en" : locale === "en" ? "it" : "pt";

  return (
    <div className="language-switch" aria-label={label}>
      <button type="button" onClick={() => onChange(nextLocale)}>
        <span>{label}</span>
        <strong>{localeNames[locale]}</strong>
      </button>
      <div className="language-options">
        {(["pt", "en", "it"] as Locale[]).map((item) => (
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
