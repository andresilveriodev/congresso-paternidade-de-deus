"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryStatus } from "@/types/congresso";

type GalleryData = { status: GalleryStatus; items: { id: string }[]; nextPage?: number };

export function useGallery<T extends GalleryData>(url: string) {
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
    async function load() {
      try {
        const response = await fetch(url, { signal: abort.signal });
        const next = await response.json() as T;
        if (!response.ok || next.status === "unavailable") throw new Error("UNAVAILABLE");
        if (!abort.signal.aborted) setResult({ url, data: next, failed: false });
      } catch {
        if (!abort.signal.aborted) setResult((previous) => ({ url, data: previous?.url === url ? previous.data : undefined, failed: true }));
      }
    }
    void load();
    // Revalidation is demand-driven. Open visible pages also check every ten minutes.
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible" && !loadingMoreRef.current) void load();
    }, 600_000);
    return () => { abort.abort(); window.clearInterval(interval); };
  }, [url, requestVersion]);

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
