import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegalPages } from "@/content/legal";
import { siteConfig } from "@/lib/constants/site";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { assertLocale, htmlLang, supportedLocales } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = assertLocale(localeParam);
  const copy = getLegalPages(locale).security;

  return {
    title: `${copy.title} - ${siteConfig.name}`,
    description: copy.description,
    alternates: {
      canonical: `/${locale}/${copy.slug}`
    },
    openGraph: {
      title: `${copy.title} - ${siteConfig.name}`,
      description: copy.description,
      images: [siteConfig.socialImage],
      locale: htmlLang[locale]
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = assertLocale(localeParam);
  const dictionary = getDictionary(locale);
  const copy = getLegalPages(locale).security;

  return <LegalPage copy={copy} labels={dictionary.navigation} locale={locale} />;
}
