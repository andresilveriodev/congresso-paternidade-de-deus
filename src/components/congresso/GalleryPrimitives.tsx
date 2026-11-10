"use client";

import { useState } from "react";
import type { GalleryCopy } from "@/content/gallery";

export function GalleryIcon({ kind }: { kind: "photo" | "video" }) {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.4">
    {kind === "photo" ? <>
      <rect x="4" y="8" width="24" height="19" rx="2" />
      <path d="m10 8 2-4h8l2 4" /><circle cx="16" cy="17" r="5" />
    </> : <><rect x="3" y="6" width="26" height="20" rx="3" /><path d="m13 11 8 5-8 5z" /></>}
  </svg>;
}

export function GalleryImage({ src, alt, fallback, className }: { src: string; alt: string; fallback: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="gallery-image-fallback"><GalleryIcon kind="photo" />{fallback}</span>
    // Same-origin, server-generated thumbnails are already resized and re-encoded.
    // eslint-disable-next-line @next/next/no-img-element
    : <img alt={alt} className={className} decoding="async" loading="lazy" onError={() => setFailed(true)} src={src} />;
}

export function GalleryState({ kind, copy, loading, failed, onRetry }: {
  kind: "photo" | "video"; copy: GalleryCopy; loading?: boolean; failed?: boolean; onRetry: () => void;
}) {
  return <div aria-live="polite" className={`gallery-state${loading ? " is-loading" : ""}`} role="status">
    <GalleryIcon kind={kind} />
    <p>{loading ? copy.loading : failed ? copy.unavailable : kind === "photo" ? copy.emptyPhotos : copy.emptyVideos}</p>
    {failed && <button className="gallery-text-button" onClick={onRetry} type="button">{copy.retry}</button>}
  </div>;
}
