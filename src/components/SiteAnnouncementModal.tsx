"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type SiteAnnouncementModalProps = {
  closeLabel: string;
  onClose: () => void;
  open: boolean;
};

export function SiteAnnouncementModal({ closeLabel, onClose, open }: SiteAnnouncementModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("announcement-modal-lock", open);

    if (open) {
      closeButtonRef.current?.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.classList.remove("announcement-modal-lock");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <div
      aria-hidden={!open}
      className={`announcement-modal ${open ? "is-open" : ""}`}
    >
      <button
        aria-label={closeLabel}
        className="announcement-modal-backdrop"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <section
        aria-describedby="announcement-modal-description"
        aria-labelledby="announcement-modal-title"
        aria-modal="true"
        className="announcement-modal-content"
        role="dialog"
      >
        <h2 className="sr-only" id="announcement-modal-title">
          Aviso sobre a inscrição com submissão de trabalhos
        </h2>
        <p className="sr-only" id="announcement-modal-description">
          Consulte os prazos para submissão e apresentação de trabalhos.
        </p>
        <button
          aria-label={closeLabel}
          className="announcement-modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          tabIndex={open ? 0 : -1}
          type="button"
        >
          <span aria-hidden="true" />
        </button>
        <Image
          alt="Atenção: prazos para inscrição com submissão de trabalho — 30 de outubro, 2 de novembro e 6 de novembro."
          height={480}
          priority
          src="/Popup-Portal-pai-Eterno.png"
          width={852}
        />
      </section>
    </div>
  );
}
