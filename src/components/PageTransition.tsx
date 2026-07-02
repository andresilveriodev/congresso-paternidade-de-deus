"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

type TransitionPhase = "idle" | "covering" | "revealing";

const COVER_DURATION = 1220;
const REVEAL_DURATION = 1150;

function getInternalHref(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    anchor.hasAttribute("download") ||
    (anchor.target && anchor.target !== "_self")
  ) {
    return null;
  }

  const nextUrl = new URL(href, window.location.href);
  const currentUrl = new URL(window.location.href);

  if (nextUrl.origin !== currentUrl.origin) {
    return null;
  }

  if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) {
    return null;
  }

  return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const pendingHref = useRef<string | null>(null);
  const routeRequested = useRef(false);
  const revealRequested = useRef(false);
  const timeouts = useRef<number[]>([]);

  const clearTransitionTimers = useCallback(() => {
    timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    timeouts.current = [];
  }, []);

  const finishTransition = useCallback(() => {
    setPhase("idle");
    pendingHref.current = null;
    routeRequested.current = false;
    revealRequested.current = false;
  }, []);

  const beginReveal = useCallback(() => {
    if (!pendingHref.current || revealRequested.current) {
      return;
    }

    revealRequested.current = true;
    setPhase("revealing");
    timeouts.current.push(window.setTimeout(finishTransition, REVEAL_DURATION));
  }, [finishTransition]);

  const startTransition = useCallback(
    (href: string) => {
      if (pendingHref.current) {
        return;
      }

      clearTransitionTimers();
      pendingHref.current = href;
      routeRequested.current = false;
      revealRequested.current = false;
      setPhase("covering");

      timeouts.current.push(
        window.setTimeout(() => {
          routeRequested.current = true;
          router.push(href);
          timeouts.current.push(window.setTimeout(beginReveal, 520));
        }, COVER_DURATION)
      );
    },
    [beginReveal, clearTransitionTimers, router]
  );

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = getInternalHref(anchor);

      if (!href) {
        return;
      }

      event.preventDefault();
      startTransition(href);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [startTransition]);

  useEffect(() => {
    if (phase !== "covering" || !routeRequested.current) {
      return;
    }

    beginReveal();
  }, [beginReveal, pathname, phase]);

  useEffect(() => clearTransitionTimers, [clearTransitionTimers]);

  return (
    <>
      <div className={`page-transition-content${phase === "revealing" ? " is-revealing" : ""}`}>{children}</div>
      {phase !== "idle" ? (
        <div aria-busy="true" className={`page-transition-overlay is-${phase}`}>
          <div aria-hidden="true" className="page-transition-panel">
            <span className="page-transition-band band-gold" />
            <span className="page-transition-band band-navy" />
            <span className="page-transition-band band-paper" />
            <span className="page-transition-band band-white" />
          </div>
        </div>
      ) : null}
    </>
  );
}
