import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const envPath = fileURLToPath(new URL("../.env.local", import.meta.url));
const accessPath = fileURLToPath(new URL("../output/galeria-acesso.txt", import.meta.url));
const args = process.argv.slice(2);
if (args.some((arg) => !["--local", "--reset-password"].includes(arg))) {
  console.error("Use --local para testes locais ou --reset-password para gerar outra senha.");
  process.exit(1);
}
let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
function set(name, value) {
  const pattern = new RegExp(`^${name}=.*$`, "m");
  content = pattern.test(content) ? content.replace(pattern, () => `${name}=${value}`) : `${content.trimEnd()}\n${name}=${value}\n`;
}
if (!/^GALLERY_ADMIN_PASSWORD_HASH=scrypt:/m.test(content) || args.includes("--reset-password")) {
  const password = randomBytes(18).toString("base64url");
  const salt = randomBytes(16).toString("hex");
  set("GALLERY_ADMIN_PASSWORD_HASH", `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`);
  set("GALLERY_SESSION_SECRET", randomBytes(32).toString("base64url"));
  mkdirSync(fileURLToPath(new URL("../output/", import.meta.url)), { recursive: true });
  writeFileSync(accessPath, `PAINEL DE FOTOS DO CONGRESSO\n\nEndereço local: http://localhost:3000/admin/galeria\nEndereço publicado: https://congressopaieterno.com.br/admin/galeria\n\nSenha: ${password}\n\nEste arquivo é privado e está fora do Git.\nA senha só funciona no site publicado após configurar o hash e o segredo de sessão na hospedagem.\n`, { encoding: "utf8", mode: 0o600 });
  console.log("Senha forte gerada. Consulte output/galeria-acesso.txt; ela não é exibida no terminal.");
} else console.log("O acesso existente foi preservado.");
if (args.includes("--local")) set("GALLERY_STORAGE", "local");
writeFileSync(envPath, content, { encoding: "utf8", mode: 0o600 });
mkdirSync(fileURLToPath(new URL("../output/", import.meta.url)), { recursive: true });
const productionConfig = ["GALLERY_ADMIN_PASSWORD_HASH", "GALLERY_SESSION_SECRET"].map((name) => content.match(new RegExp(`^${name}=.*$`, "m"))?.[0]).filter(Boolean).join("\n");
writeFileSync(fileURLToPath(new URL("../output/galeria-vercel.env", import.meta.url)), `${productionConfig}\n`, { encoding: "utf8", mode: 0o600 });
console.log("Configuração salva em .env.local, fora do Git. Reinicie o servidor se necessário.");
console.log("As duas configurações de acesso para a Vercel estão em output/galeria-vercel.env, também fora do Git.");
console.log(args.includes("--local") ? "Os testes locais gravam apenas em output/galeria-dados. Não usam armazenamento de produção." : "Para produção, conecte um Blob privado ao projeto da Vercel e configure o acesso ao painel.");
