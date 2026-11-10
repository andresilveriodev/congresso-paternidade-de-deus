import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const envPath = fileURLToPath(new URL("../.env.local", import.meta.url));
const args = process.argv.slice(2);

function extractId(input, kind) {
  let value = input.trim();
  if (value.startsWith("https://")) {
    const url = new URL(value);
    if (kind === "drive" && url.hostname === "drive.google.com") {
      value = url.pathname.match(/\/folders\/([\w-]+)/)?.[1] ?? "";
    } else if (kind === "playlist" && ["www.youtube.com", "youtube.com", "m.youtube.com"].includes(url.hostname)) {
      value = url.searchParams.get("list") ?? "";
    } else throw new Error(`Link de ${kind} inválido.`);
  }
  if (!/^[\w-]{10,100}$/.test(value)) throw new Error(`ID de ${kind} inválido. Use o link da pasta ou da playlist.`);
  return value;
}

try {
  if (args.length === 1 && args[0] === "--check") {
    if (existsSync(envPath)) process.loadEnvFile(envPath);
    for (const name of ["GOOGLE_DRIVE_FOLDER_ID", "GOOGLE_SERVICE_ACCOUNT_JSON", "YOUTUBE_PLAYLIST_ID", "YOUTUBE_API_KEY"]) {
      console.log(`${name}: ${process.env[name]?.trim() ? "preenchido" : "pendente"}${name === "YOUTUBE_API_KEY" ? " (opcional para player da playlist)" : ""}`);
    }
    console.log(`YOUTUBE_DISPLAY_MODE: ${process.env.YOUTUBE_DISPLAY_MODE === "cards" ? "cards" : "playlist (padrão; dispensa chave de API)"}`);
    console.log("Esta verificação não autentica nos serviços externos nem exibe valores secretos.");
  } else {
    const values = {};
    for (let i = 0; i < args.length; i += 2) {
      const name = args[i];
      if (!["--drive", "--playlist"].includes(name) || !args[i + 1]) throw new Error("Use --drive LINK_DA_PASTA e/ou --playlist LINK_DA_PLAYLIST.");
      values[name === "--drive" ? "GOOGLE_DRIVE_FOLDER_ID" : "YOUTUBE_PLAYLIST_ID"] = extractId(args[i + 1], name === "--drive" ? "drive" : "playlist");
    }
    if (!Object.keys(values).length) throw new Error("Informe --drive e/ou --playlist; use --check para consultar pendências.");
    let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "# Configuração local da galeria. Não versionar este arquivo.\n";
    for (const [key, value] of Object.entries(values)) {
      const line = `${key}=${value}`;
      const pattern = new RegExp(`^${key}=.*$`, "m");
      content = pattern.test(content) ? content.replace(pattern, line) : `${content.trimEnd()}\n${line}\n`;
    }
    writeFileSync(envPath, content, "utf8");
    console.log("Links convertidos em IDs e salvos em .env.local. Outras configurações foram preservadas.");
    console.log("Fotos: configure GOOGLE_SERVICE_ACCOUNT_JSON e compartilhe apenas a pasta com a conta de serviço como Leitor.");
    console.log("Reinicie o servidor local. Na hospedagem, configure as mesmas variáveis no painel do projeto.");
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : "Não foi possível preparar a configuração.");
  process.exitCode = 1;
}
