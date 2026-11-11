"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryStatus } from "@/types/congresso";

type GalleryData = { status: GalleryStatus; items: { id: string }[]; nextPage?: number };

export function useGallery<T extends GalleryData>(url: string, refreshInterval = 600_000, preserveLoadedPages = true) {
  const [result, setResult] = useState<{ url: string; data?: T; failed: boolean }>();
  const [requestVersion, setRequestVersion] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const loadingMoreRef = useRef(false);
  const data = result?.url === url ? result.data : undefined;
  const failed = result?.url === url && result.failed;

  useEffect(() => {
    const abort = new AbortController();
    controller.current = abort;
    let fetching = false;
    async function load() {
      if (fetching || loadingMoreRef.current) return;
      fetching = true;
      try {
        const response = await fetch(url, { signal: abort.signal });
        const next = await response.json() as T;
        if (!response.ok || next.status === "unavailable") throw new Error("UNAVAILABLE");
        if (!abort.signal.aborted) setResult((previous) => {
          const prior = previous?.url === url ? previous.data : undefined;
          // Preserve already loaded pages while new photos are added at the front.
          const overlaps = prior?.items.some((item) => next.items.some((fresh) => fresh.id === item.id));
          const data = prior && preserveLoadedPages ? {
            ...next, nextPage: overlaps ? prior.nextPage : next.nextPage,
            items: [...new Map([...next.items, ...prior.items].map((item) => [item.id, item])).values()]
          } as T : next;
          return { url, data, failed: false };
        });
      } catch {
        if (!abort.signal.aborted) setResult((previous) => ({ url, data: previous?.url === url ? previous.data : undefined, failed: true }));
      } finally { fetching = false; }
    }
    void load();
    const refreshVisible = () => { if (document.visibilityState === "visible") void load(); };
    const onStorage = (event: StorageEvent) => { if (event.key === "congresso-gallery-updated") refreshVisible(); };
    const interval = window.setInterval(() => {
      refreshVisible();
    }, refreshInterval);
    window.addEventListener("focus", refreshVisible);
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", refreshVisible);
    return () => {
      abort.abort(); window.clearInterval(interval);
      window.removeEventListener("focus", refreshVisible);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", refreshVisible);
    };
  }, [url, requestVersion, refreshInterval, preserveLoadedPages]);

  const retry = useCallback(() => setRequestVersion((value) => value + 1), []);

  async function loadMore() {
    if (!data?.nextPage || loadingMoreRef.current) return;
    const abort = controller.current;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    try {
      const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}page=${data.nextPage}`, { signal: abort?.signal });
      const next = await response.json() as T;
      if (!response.ok || next.status !== "ready") throw new Error("UNAVAILABLE");
      if (!abort?.signal.aborted) setResult((previous) => previous?.url === url && previous.data ? {
        url, failed: false, data: { ...next, items: [...new Map([...previous.data.items, ...next.items].map((item) => [item.id, item])).values()] }
      } : previous);
    } catch {
      if (!abort?.signal.aborted) setResult((previous) => previous ? { ...previous, failed: true } : previous);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }

  return { data, failed, loading: !data && !failed, loadingMore, retry, loadMore };
}
