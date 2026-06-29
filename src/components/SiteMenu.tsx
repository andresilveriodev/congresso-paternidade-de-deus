"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Locale, localeNames } from "@/lib/i18n";

type SiteMenuProps = {
  anchorPrefix?: string;
  labels: Record<string, string>;
  locale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
  showRegistrationButton?: boolean;
};

export function SiteMenu({
  anchorPrefix = "",
  labels,
  locale,
  onLocaleChange,
  showRegistrationButton = true
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: labels.schedule, href: `${anchorPrefix}#programacao` },
    { label: labels.speakers, href: `${anchorPrefix}#conferencistas` },
    { label: labels.papers, href: `${anchorPrefix}#trabalhos` },
    { label: labels.location, href: `${anchorPrefix}#local` }
  ];

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        aria-controls="site-main-menu"
        aria-expanded={open}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="menu-toggle"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <nav aria-label="Menu principal" className={`main-menu${open ? " is-open" : ""}`} id="site-main-menu">
        {links.map((item) => (
          <a href={item.href} key={item.label} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        {showRegistrationButton ? (
          <Link className="header-cta" href="/inscricao" onClick={closeMenu}>
            <ArrowIcon />
            <span>{labels.registration}</span>
          </Link>
        ) : null}
        {locale && onLocaleChange ? (
          <div className="mobile-menu-language" aria-label={labels.language}>
            <span>{labels.language}</span>
            <div>
              {(["pt", "en", "it"] as Locale[]).map((item) => (
                <button
                  aria-pressed={locale === item}
                  key={item}
                  onClick={() => {
                    onLocaleChange(item);
                    closeMenu();
                  }}
                  type="button"
                >
                  {localeNames[item]}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
}
