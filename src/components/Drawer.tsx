"use client";

import { ReactNode, useEffect } from "react";

type DrawerProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  image?: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ open, title, subtitle, image, closeLabel, onClose, children }: DrawerProps) {
  useEffect(() => {
    document.body.classList.toggle("drawer-lock", open);
    return () => document.body.classList.remove("drawer-lock");
  }, [open]);

  return (
    <div className={`drawer-shell ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="drawer-overlay" onClick={onClose} type="button" />
      <aside aria-modal="true" className="drawer-panel" role="dialog">
        <button className="drawer-close" onClick={onClose} type="button">
          <span>{closeLabel}</span>
        </button>
        <div className="drawer-content">
          <p className="section-kicker">Detalhes</p>
          <h2>{title}</h2>
          {subtitle ? <p className="drawer-subtitle">{subtitle}</p> : null}
          <div className="drawer-text">{children}</div>
          {image ? <img alt="" className="drawer-image" src={image} /> : null}
        </div>
      </aside>
    </div>
  );
}
