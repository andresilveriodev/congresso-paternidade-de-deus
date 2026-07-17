export const supportedLocales = ["pt", "en", "es", "it"] as const;

export type Locale = (typeof supportedLocales)[number];

