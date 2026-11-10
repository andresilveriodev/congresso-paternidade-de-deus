"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Session = { authenticated: boolean; configured: boolean; storage?: "local" | "vercel" | "unconfigured" };
type UploadStatus = "ready" | "preparing" | "sending" | "sent" | "duplicate" | "error";
type Entry = { id: string; file: File; preview: string; status: UploadStatus; message?: string };
const messages: Record<UploadStatus, string> = { ready: "Pronta para enviar", preparing: "Preparando foto…", sending: "Publicando…", sent: "Publicada", duplicate: "Já estava na galeria", error: "Não foi enviada" };

async function preparePhoto(file: File) {
  const image = await createImageBitmap(file).catch(() => { throw new Error("Não foi possível abrir esta foto. Use uma imagem JPG, PNG ou WebP válida."); });
  try {
    if (image.width * image.height > 40_000_000) throw new Error("Esta foto é muito grande. Escolha uma versão de até 40 megapixels.");
    for (const maximum of [1920, 1536, 1280]) {
      const scale = Math.min(1, maximum / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Não foi possível preparar a foto neste navegador.");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Não foi possível preparar a foto.")), "image/webp", .88));
      if (blob.size <= 3 * 1024 * 1024) return new File([blob], file.name, { type: blob.type });
    }
    throw new Error("Escolha uma versão menor desta foto e tente novamente.");
  } finally { image.close(); }
}

function UploadIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.5"><path d="M16 22V4m-6 6 6-6 6 6M5 21v6h22v-6" /></svg>;
}

export function GalleryAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [day, setDay] = useState("");
  const [sending, setSending] = useState(false);
  const [dragging, setDragging] = useState(false);
  const previews = useRef(new Set<string>());
  const sendingRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/admin/galeria/session", { cache: "no-store", signal: controller.signal }).then(async (response) => {
      if (!response.ok) throw new Error();
      setSession(await response.json());
    }).catch(() => { if (!controller.signal.aborted) setNotice("Não foi possível abrir o painel. Recarregue a página para tentar novamente."); });
    const urls = previews.current;
    return () => { controller.abort(); urls.forEach((url) => URL.revokeObjectURL(url)); };
  }, []);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => { if (sendingRef.current) event.preventDefault(); };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoggingIn(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/galeria/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível entrar agora.");
      setSession({ configured: true, ...data });
      setPassword("");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Não foi possível entrar agora."); }
    finally { setLoggingIn(false); }
  }

  async function logout() {
    setNotice("");
    try {
      const response = await fetch("/api/admin/galeria/session", { method: "DELETE" });
      if (!response.ok) throw new Error();
      setSession((current) => current ? { ...current, authenticated: false } : current);
    } catch { setNotice("Não foi possível sair agora. Tente novamente."); }
  }

  function addFiles(files: FileList | File[]) {
    if (sendingRef.current) return;
    const selection = Array.from(files);
    if (entries.length + selection.length > 100) { setNotice("Selecione até 100 fotos por remessa. Limpe as fotos já publicadas para começar outra remessa."); return; }
    const accepted: Entry[] = [];
    const rejected: string[] = [];
    for (const file of selection) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || !file.size || file.size > 20 * 1024 * 1024) { rejected.push(file.name); continue; }
      const preview = URL.createObjectURL(file);
      previews.current.add(preview);
      accepted.push({ id: crypto.randomUUID(), file, preview, status: "ready" });
    }
    setEntries((current) => [...current, ...accepted]);
    setNotice(rejected.length ? `${rejected.length} arquivo(s) não foram selecionados. Use fotos JPG, PNG ou WebP de até 20 MB.` : "");
  }

  function removeEntry(id: string) {
    if (sendingRef.current) return;
    const entry = entries.find((item) => item.id === id);
    if (entry) { URL.revokeObjectURL(entry.preview); previews.current.delete(entry.preview); }
    setEntries((current) => current.filter((item) => item.id !== id));
  }

  function updateEntry(id: string, status: UploadStatus, message?: string) {
    setEntries((current) => current.map((entry) => entry.id === id ? { ...entry, status, message } : entry));
  }

  async function publish() {
    if (sendingRef.current) return;
    const pending = entries.filter((entry) => entry.status === "ready" || entry.status === "error");
    if (!pending.length) return;
    sendingRef.current = true;
    setSending(true);
    setNotice("");
    let published = 0;
    let failures = 0;
    let duplicates = 0;
    let expired = false;
    try {
      for (const entry of pending) {
        try {
          updateEntry(entry.id, "preparing");
          const file = await preparePhoto(entry.file);
          const form = new FormData();
          form.set("file", file);
          form.set("day", day.trim());
          updateEntry(entry.id, "sending");
          const response = await fetch("/api/admin/galeria/fotos", { method: "POST", body: form, signal: AbortSignal.timeout(60000) });
          if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("O serviço de envio está indisponível agora. Tente novamente.");
          const data = await response.json();
          if (response.status === 401) {
            updateEntry(entry.id, "ready");
            setSession((current) => current ? { ...current, authenticated: false } : current);
            setNotice(data.error);
            expired = true;
            break;
          }
          if (!response.ok) throw new Error(data.error || "Não foi possível publicar esta foto.");
          updateEntry(entry.id, data.duplicate ? "duplicate" : "sent");
          if (data.duplicate) duplicates++; else published++;
          try { localStorage.setItem("congresso-gallery-updated", String(Date.now())); } catch { /* Other visitors also refresh periodically. */ }
        } catch (error) {
          failures++;
          updateEntry(entry.id, "error", error instanceof Error && !["AbortError", "TimeoutError", "TypeError"].includes(error.name) ? error.message : "Falha no envio. Confira sua conexão e tente novamente.");
        }
      }
      if (!expired) setNotice(`${published} foto(s) publicada(s).${duplicates ? ` ${duplicates} já estavam na galeria.` : ""}${failures ? ` ${failures} não foram enviadas. Você pode tentar novamente.` : ""}`);
    } finally { sendingRef.current = false; setSending(false); }
  }

  const pending = entries.filter((entry) => entry.status === "ready" || entry.status === "error").length;
  const completed = entries.filter((entry) => ["sent", "duplicate"].includes(entry.status)).length;

  return <main className="gallery-admin">
    <header className="admin-header"><a className="admin-brand" href="/pt">Paternidade de Deus<span>Congresso Internacional</span></a><a className="admin-gallery-link" href="/pt#galeria" target="_blank" rel="noreferrer">Ver galeria <span aria-hidden="true">↗</span></a></header>
    <div className="admin-main">
      <p className="admin-eyebrow">Painel de fotos</p>
      {!session?.authenticated ? <section className="admin-login">
        <h1>Fotos do Congresso</h1><p>Entre para publicar os registros do encontro.</p>
        {!session && !notice && <p role="status">Carregando painel…</p>}
        {session?.configured === false && <p className="admin-notice">O acesso ao painel ainda precisa ser ativado pelo responsável pelo site.</p>}
        <form onSubmit={login}>
          <label htmlFor="gallery-password">Senha de acesso</label>
          <input autoComplete="current-password" disabled={!session?.configured || loggingIn} id="gallery-password" maxLength={256} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
          <button className="admin-primary" disabled={!session?.configured || loggingIn} type="submit">{loggingIn ? "Entrando…" : "Entrar no painel"}</button>
        </form>
        {notice && <p className="admin-notice" role="alert">{notice}</p>}
      </section> : <>
        <div className="admin-heading"><div><h1>Publicar fotos</h1><p>Selecione os registros e envie para a galeria do Congresso.</p></div><button className="admin-secondary" disabled={sending} onClick={logout} type="button">Sair</button></div>
        {session.storage === "local" && <p className="admin-notice">Teste local: as fotos enviadas ficam apenas neste computador.</p>}
        {session.storage === "unconfigured" && <p className="admin-notice" role="alert">O armazenamento precisa ser ativado na hospedagem antes do primeiro envio.</p>}
        <section className="admin-upload" aria-label="Envio de fotos">
          <div className={`admin-dropzone${dragging ? " is-dragging" : ""}`} onDragLeave={() => setDragging(false)} onDragOver={(event) => { event.preventDefault(); if (!sending) setDragging(true); }} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
            <label className="admin-file-label"><UploadIcon /><strong>Selecionar fotos</strong><span>ou arraste as fotos para cá</span><small>JPG, PNG ou WebP · até 20 MB por foto</small><input accept="image/jpeg,image/png,image/webp" aria-label="Selecionar fotos para publicar" className="sr-only" disabled={sending} multiple onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.target.value = ""; }} type="file" /></label>
          </div>
          <div className="admin-album"><label htmlFor="gallery-album">Dia ou álbum <span>(opcional)</span></label><input disabled={sending} id="gallery-album" maxLength={80} onChange={(event) => setDay(event.target.value)} placeholder="Ex.: Dia 2 — 10 de novembro" type="text" value={day} /><small>As fotos ficam agrupadas por esse nome na galeria.</small></div>
        </section>
        {entries.length > 0 && <section aria-label="Fotos selecionadas" className="admin-selection">
          <div className="admin-selection-heading"><h2>{entries.length} foto(s) selecionada(s)</h2><button className="admin-text-button" disabled={sending} onClick={() => entries.filter((entry) => ["sent", "duplicate"].includes(entry.status)).forEach((entry) => removeEntry(entry.id))} type="button">Limpar publicadas</button></div>
          <ul className="admin-photo-list">{entries.map((entry) => <li className={`admin-photo-item is-${entry.status}`} key={entry.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={`Prévia de ${entry.file.name}`} src={entry.preview} />
            <div><strong>{entry.file.name}</strong><span>{entry.message || messages[entry.status]}</span></div>
            {!sending && <button aria-label={`Remover ${entry.file.name} da seleção`} className="admin-remove" onClick={() => removeEntry(entry.id)} type="button">×</button>}
          </li>)}</ul>
        </section>}
        <div className="admin-actions"><p>As fotos entram na galeria após a confirmação do envio.</p><button className="admin-primary" disabled={sending || !pending || session.storage === "unconfigured"} onClick={publish} type="button">{sending ? "Publicando fotos…" : `Publicar${pending ? ` ${pending} foto(s)` : " fotos"}`}</button></div>
        {sending && <div className="admin-progress" role="status"><progress max={entries.length || 1} value={completed} /><span>{completed} de {entries.length} concluídas. Mantenha esta página aberta.</span></div>}
        {notice && <p className="admin-notice" role="status">{notice}</p>}
      </>}
    </div>
  </main>;
}
