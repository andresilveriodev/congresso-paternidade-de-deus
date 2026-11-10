"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { GalleryCopy } from "@/content/gallery";

export function GalleryModal({ title, copy, onClose, onPrevious, onNext, children, video }: {
  title: string; copy: GalleryCopy; onClose: () => void; onPrevious?: () => void; onNext?: () => void;
  children: ReactNode; video?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(<dialog
    aria-label={title}
    className={`gallery-modal${video ? " gallery-modal-video" : ""}`}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft" && onPrevious) { event.preventDefault(); onPrevious(); }
      if (event.key === "ArrowRight" && onNext) { event.preventDefault(); onNext(); }
    }}
    ref={dialogRef}
  >
    <div className="gallery-modal-content">
      <button aria-label={copy.close} autoFocus className="gallery-modal-close" onClick={onClose} type="button">×</button>
      <div className="gallery-modal-media">{children}</div>
      <div className="gallery-modal-caption">
        <p>{title}</p>
        {onPrevious && onNext && <div className="gallery-modal-navigation">
          <button aria-label={copy.previous} onClick={onPrevious} type="button">←</button>
          <button aria-label={copy.next} onClick={onNext} type="button">→</button>
        </div>}
      </div>
    </div>
  </dialog>, document.body);
}
