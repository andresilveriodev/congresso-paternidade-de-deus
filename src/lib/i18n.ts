export type Locale = "pt" | "en" | "it";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  it: "Italiano"
};

export const locales: Record<Locale, {
  nav: string[];
  labels: Record<string, string>;
  hero: { title: string; subtitle: string; cta: string };
  intro: string;
}> = {
  pt: {
    nav: ["Programação", "Mistério", "Formação", "Conferencistas", "Local", "Regulamento"],
    labels: {
      language: "Idioma",
      more: "Mais informação",
      registration: "Inscrição",
      schedule: "Programação",
      mystery: "Apresentação",
      formation: "Pesquisa teológica e formação eclesial",
      speakers: "Conferencistas",
      general: "Informações gerais",
      location: "Local do evento",
      indications: "Indicações",
      papers: "Trabalhos científicos",
      rules: "Regulamento",
      registerNow: "Fazer inscrição",
      close: "Fechar"
    },
    hero: {
      title: "Paternidade de Deus",
      subtitle:
        "Uma jornada de fé no coração da devoção ao Pai Eterno",
      cta: "Inscrição"
    },
    intro:
      "Uma experiência internacional de teologia, liturgia, piedade popular e missão evangelizadora."
  },
  en: {
    nav: ["Schedule", "Mystery", "Formation", "Speakers", "Venue", "Rules"],
    labels: {
      language: "Language",
      more: "More information",
      registration: "Registration",
      schedule: "Schedule",
      mystery: "Presentation",
      formation: "Theological research and ecclesial formation",
      speakers: "Speakers",
      general: "General information",
      location: "Venue",
      indications: "Recommendations",
      papers: "Scientific papers",
      rules: "Rules",
      registerNow: "Register now",
      close: "Close"
    },
    hero: {
      title: "Fatherhood of God",
      subtitle:
        "A journey of faith at the heart of devotion to the Eternal Father",
      cta: "Registration"
    },
    intro:
      "An international experience of theology, liturgy, popular devotion and evangelizing mission."
  },
  it: {
    nav: ["Programma", "Mistero", "Formazione", "Relatori", "Luogo", "Regolamento"],
    labels: {
      language: "Lingua",
      more: "Maggiori informazioni",
      registration: "Iscrizione",
      schedule: "Programma",
      mystery: "Presentazione",
      formation: "Ricerca teologica e formazione ecclesiale",
      speakers: "Relatori",
      general: "Informazioni generali",
      location: "Luogo dell'evento",
      indications: "Indicazioni",
      papers: "Lavori scientifici",
      rules: "Regolamento",
      registerNow: "Iscriviti",
      close: "Chiudi"
    },
    hero: {
      title: "Paternità di Dio",
      subtitle:
        "Un cammino di fede nel cuore della devozione al Padre Eterno",
      cta: "Iscrizione"
    },
    intro:
      "Un'esperienza internazionale di teologia, liturgia, pietà popolare e missione evangelizzatrice."
  }
};

export function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem("paternidade-locale");
  return stored === "en" || stored === "it" || stored === "pt" ? stored : "pt";
}

export function saveLocale(locale: Locale) {
  window.localStorage.setItem("paternidade-locale", locale);
  document.documentElement.lang = locale === "pt" ? "pt-BR" : locale;
}

/*
  Como adicionar ou alterar textos:
  1. Edite este arquivo e atualize o objeto `locales`.
  2. Cada idioma deve ter a mesma chave: pt, en, it ou um novo código, por exemplo "es".
  3. Para adicionar outro idioma no futuro, inclua o código no tipo Locale, em localeNames
     e copie a mesma estrutura de labels/hero/intro. Os componentes já leem tudo por chave.
*/
