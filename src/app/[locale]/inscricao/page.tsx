import type { Metadata } from "next";
import { RegistrationPage } from "@/components/RegistrationPage";
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
    title: dictionary.seo.inscricao.title,
    description: dictionary.seo.inscricao.description,
    openGraph: {
      title: dictionary.seo.inscricao.title,
      description: dictionary.seo.inscricao.description,
      images: [siteConfig.socialImage],
      locale: htmlLang[locale]
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = assertLocale(localeParam);
  const dictionary = getDictionary(locale);

  return <RegistrationPage copy={dictionary.inscricao} labels={dictionary.navigation} locale={locale} />;
}

