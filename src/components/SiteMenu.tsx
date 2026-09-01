"use client";

import Link from "next/link";
import { type MouseEvent, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { registrationCheckoutUrl } from "@/lib/constants/routes";
import { localeNames, supportedLocales, type Locale } from "@/lib/i18n/locales";

type SiteMenuProps = {
  anchorPrefix?: string;
  languagePathSuffix?: string;
  labels: Record<string, string>;
  locale?: Locale;
  showRegistrationButton?: boolean;
};

let activeAnchorScrollFrame: number | null = null;

const menuA11y: Record<Locale, { close: string; label: string; open: string }> = {
  pt: { close: "Fechar menu", label: "Menu principal", open: "Abrir menu" },
  en: { close: "Close menu", label: "Main menu", open: "Open menu" },
  es: { close: "Cerrar menú", label: "Menú principal", open: "Abrir menú" },
  it: { close: "Chiudi menu", label: "Menu principale", open: "Apri menu" }
};

function easeInOutCubic(progress: number) {
  return progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function scrollToAnchorTarget(target: HTMLElement) {
  if (activeAnchorScrollFrame !== null) {
    window.cancelAnimationFrame(activeAnchorScrollFrame);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.scrollIntoView({ block: "start" });
    return;
  }

  const startY = window.scrollY;
  const targetY = startY + target.getBoundingClientRect().top;
  const distance = targetY - startY;
  const duration = 1600;
  const startTime = window.performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      activeAnchorScrollFrame = window.requestAnimationFrame(step);
      return;
    }

    activeAnchorScrollFrame = null;
  }

  activeAnchorScrollFrame = window.requestAnimationFrame(step);
}

export function SiteMenu({
  anchorPrefix = "",
  languagePathSuffix = "",
  labels,
  locale,
  showRegistrationButton = true
}: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const menuLabels = menuA11y[locale ?? "pt"];
  const links = [
    { label: labels.schedule, href: `${anchorPrefix}#programacao` },
    { label: labels.speakers, href: `${anchorPrefix}#conferencistas` },
    { label: labels.papers, href: `${anchorPrefix}#trabalhos` },
    { label: labels.location, href: `${anchorPrefix}#local` }
  ];

  const closeMenu = () => setOpen(false);

  function handleAnchorClick(href: string, event: MouseEvent<HTMLAnchorElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
      return;
    }

    const url = new URL(href, window.location.origin);
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const targetPath = url.pathname.replace(/\/$/, "");
    const targetId = decodeURIComponent(url.hash.slice(1));
    const target = targetId ? document.getElementById(targetId) : null;

    if (url.hash && currentPath === targetPath && target) {
      event.preventDefault();
      closeMenu();
      window.history.pushState(null, "", `${url.pathname}${url.hash}`);
      scrollToAnchorTarget(target);
      return;
    }

    closeMenu();
  }

  return (
    <>
      <button
        aria-controls="site-main-menu"
        aria-expanded={open}
        aria-label={open ? menuLabels.close : menuLabels.open}
        className="menu-toggle"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <nav aria-label={menuLabels.label} className={`main-menu${open ? " is-open" : ""}`} id="site-main-menu">
        {links.map((item) => (
          <a href={item.href} key={item.label} onClick={(event) => handleAnchorClick(item.href, event)}>
            {item.label}
          </a>
        ))}
        {showRegistrationButton ? (
          <a className="header-cta" href={registrationCheckoutUrl()} onClick={closeMenu}>
            <ArrowIcon />
            <span>{labels.registration}</span>
          </a>
        ) : null}
        {locale ? (
          <div className="mobile-menu-language" aria-label={labels.language}>
            <span>{labels.language}</span>
            <div>
              {supportedLocales.map((item) => (
                <Link
                  aria-current={locale === item ? "page" : undefined}
                  href={`/${item}${languagePathSuffix}`}
                  key={item}
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  {localeNames[item]}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
}
