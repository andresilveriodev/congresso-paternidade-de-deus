import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
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
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.seo.home.title,
    description: dictionary.seo.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
        it: "/it"
      }
    },
    openGraph: {
      title: dictionary.seo.home.title,
      description: dictionary.seo.home.description,
      images: [siteConfig.socialImage],
      locale: htmlLang[locale]
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = assertLocale(localeParam);
  const dictionary = getDictionary(locale);

  return <HomePage home={dictionary.home} labels={dictionary.navigation} locale={locale} />;
}

