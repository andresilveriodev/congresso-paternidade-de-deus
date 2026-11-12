import type { Locale } from "@/types/locale";

export const congressPhotoDays = ["10/11/2026", "11/11/2026", "12/11/2026"];

export const photoGalleryCopy = {
  pt: { intro: "Escolha o dia para ver as fotos. Clique em uma imagem para ampliar.", viewAll: "Ver todas as fotos", back: "Voltar ao início", filter: "Fotos por dia", photos: "fotos" },
  en: { intro: "Choose a day to see the photos. Select an image to enlarge it.", viewAll: "View all photos", back: "Back to home", filter: "Photos by day", photos: "photos" },
  es: { intro: "Elige el día para ver las fotos. Haz clic en una imagen para ampliarla.", viewAll: "Ver todas las fotos", back: "Volver al inicio", filter: "Fotos por día", photos: "fotos" },
  it: { intro: "Scegli il giorno per vedere le foto. Seleziona un’immagine per ingrandirla.", viewAll: "Vedi tutte le foto", back: "Torna all’inizio", filter: "Foto per giorno", photos: "foto" }
} satisfies Record<Locale, { intro: string; viewAll: string; back: string; filter: string; photos: string }>;

export function photoDayParts(value: string, locale: Locale) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return { label: value, day: "", month: "" };
  const date = new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
  const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(date);
  const month = new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }).format(date);
  return { label: capitalize(locale === "pt" ? weekday.replace("-feira", "") : weekday), day: match[1], month: capitalize(month) };
}
