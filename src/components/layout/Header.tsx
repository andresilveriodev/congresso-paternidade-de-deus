"use client";

import Link from "next/link";
import { SiteMenu } from "@/components/SiteMenu";
import { localeNames, supportedLocales, type Locale } from "@/lib/i18n/locales";

type HeaderProps = {
  brandHref: string;
  brandImage: string;
  mobileBrandImage?: string;
  brandAlt: string;
  labels: Record<string, string>;
  locale: Locale;
  languageLabels?: Record<Locale, string>;
  languagePathSuffix?: string;
  variant?: "home" | "registration";
  showRegistrationButton?: boolean;
};

export function Header({
  brandAlt,
  brandHref,
  brandImage,
  labels,
  languageLabels,
  languagePathSuffix = "",
  locale,
  mobileBrandImage,
  showRegistrationButton = true,
  variant = "home"
}: HeaderProps) {
  return (
    <header className={`site-header ${variant === "registration" ? "registration-header" : "home-header"}`}>
      <Link className="brand" href={brandHref}>
        {mobileBrandImage ? (
          <picture>
            <source media="(max-width: 700px)" srcSet={mobileBrandImage} />
            <img alt={brandAlt} src={brandImage} />
          </picture>
        ) : (
          <img alt={brandAlt} src={brandImage} />
        )}
      </Link>
      <SiteMenu
        anchorPrefix={`/${locale}`}
        languagePathSuffix={languagePathSuffix}
        labels={labels}
        locale={locale}
        showRegistrationButton={showRegistrationButton}
      />
      <div
        className={variant === "registration" ? "registration-language" : "home-language"}
        aria-label={labels.language}
      >
        {supportedLocales.map((item) => (
          <Link aria-current={locale === item ? "page" : undefined} href={`/${item}${languagePathSuffix}`} key={item}>
            {languageLabels?.[item] ?? localeNames[item]}
          </Link>
        ))}
      </div>
    </header>
  );
}
