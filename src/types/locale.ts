export const supportedLocales = ["pt", "en", "it"] as const;

export type Locale = (typeof supportedLocales)[number];

