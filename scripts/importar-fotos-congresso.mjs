import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.resolve(root, process.argv[2] ?? "fotos");
const batches = [
  { folder: "12 quinta feira", day: "12/11/2026", slug: "dia-12", number: "12" },
  { folder: "11 Quarta Feira", day: "11/11/2026", slug: "dia-11", number: "11" }
];
const collator = new Intl.Collator("pt-BR", { numeric: true, sensitivity: "base" });
const jobs = [];
for (const batch of batches) {
  const files = (await readdir(path.join(source, batch.folder))).filter((name) => /\.(jpe?g|png|webp)$/i.test(name)).sort(collator.compare);
  await mkdir(path.join(root, "public/images/congresso", batch.slug), { recursive: true });
  files.forEach((name, index) => jobs.push({ ...batch, name, index }));
}

const results = new Array(jobs.length);
const seen = new Set();
let cursor = 0;
let complete = 0;
let duplicates = 0;
let originalBytes = 0;
let publishedBytes = 0;
async function worker() {
  while (cursor < jobs.length) {
    const jobIndex = cursor++;
    const job = jobs[jobIndex];
    const input = await readFile(path.join(source, job.folder, job.name));
    originalBytes += input.length;
    const hash = createHash("sha256").update(input).digest("hex").slice(0, 16);
    const key = `${job.slug}-${hash}`;
    if (seen.has(key)) { duplicates++; continue; }
    seen.add(key);
    const base = `/images/congresso/${job.slug}/foto-${hash}`;
    const imagePath = path.join(root, "public", `${base}.webp`);
    const thumbnailPath = path.join(root, "public", `${base}-miniatura.webp`);
    const image = sharp(input, { limitInputPixels: 80_000_000, animated: false }).rotate();
    const large = await image.clone().resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true }).webp({ quality: 84 }).toFile(imagePath);
    const thumbnail = await image.clone().resize({ width: 640, height: 480, fit: "inside", withoutEnlargement: true }).webp({ quality: 76 }).toFile(thumbnailPath);
    publishedBytes += large.size + thumbnail.size;
    const number = String(job.index + 1).padStart(3, "0");
    results[jobIndex] = {
      id: `congresso-${key}`,
      day: job.day,
      title: `Congresso Paternidade de Deus — ${job.number}/11 — Foto ${number}`,
      alt: `Registro do Congresso Paternidade de Deus em ${job.number} de novembro de 2026. Foto ${number}.`,
      thumbnailUrl: `${base}-miniatura.webp`,
      imageUrl: `${base}.webp`
    };
    complete++;
    if (complete % 50 === 0) console.log(`Preparadas ${complete} fotos de ${jobs.length}.`);
  }
}
await Promise.all(Array.from({ length: 3 }, worker));
const items = results.filter(Boolean);
await writeFile(path.join(root, "src/content/congress-photo-imports.json"), `${JSON.stringify(items, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ photos: items.length, duplicates, originalBytes, publishedBytes,
  days: Object.fromEntries(batches.map((batch) => [batch.day, items.filter((item) => item.day === batch.day).length])) }, null, 2));
