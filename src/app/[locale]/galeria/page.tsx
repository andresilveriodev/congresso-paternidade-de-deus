import type { Metadata } from "next";
import Link from "next/link";
import { GaleriaFotos } from "@/components/congresso/GaleriaFotos";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { galleryCopy } from "@/content/gallery";
import { getLegalFooterLinks } from "@/content/legal";
import { photoGalleryCopy } from "@/content/photo-gallery";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { assertLocale, supportedLocales } from "@/lib/i18n/locales";
import { images } from "@/lib/site-data";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  return {
    title: `${galleryCopy[locale].photos} - Paternidade de Deus`,
    description: photoGalleryCopy[locale].intro,
    alternates: {
      canonical: `/${locale}/galeria`,
      languages: { "pt-BR": "/pt/galeria", en: "/en/galeria", es: "/es/galeria", it: "/it/galeria" }
    }
  };
}

export default async function PhotoGalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = assertLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = galleryCopy[locale];
  const pageCopy = photoGalleryCopy[locale];
  return <>
    <Header brandAlt="Paternidade de Deus" brandHref={`/${locale}`} brandImage={images.markRegistration}
      labels={dictionary.navigation} languagePathSuffix="/galeria" locale={locale} variant="registration" />
    <main className="photo-gallery-page">
      <Link className="gallery-back-link" href={`/${locale}#galeria`}>← {pageCopy.back}</Link>
      <div className="photo-gallery-intro"><h1>{copy.title} <span>{copy.subtitle}</span></h1><p>{pageCopy.intro}</p></div>
      <GaleriaFotos copy={copy} layout="grid" locale={locale} />
    </main>
    <Footer links={getLegalFooterLinks(locale).map((link) => ({ href: `/${locale}/${link.href}`, label: link.label }))}
      logo={images.markDark} text={dictionary.home.footer} />
  </>;
}
