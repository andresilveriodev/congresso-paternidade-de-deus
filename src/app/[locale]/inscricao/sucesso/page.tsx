import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { assertLocale, supportedLocales } from "@/lib/i18n/locales";

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
    title: dictionary.seo.sucesso.title,
    description: dictionary.seo.sucesso.description
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = assertLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <main className="success-page">
      <section className="payment-card">
        <p className="section-kicker">{dictionary.navigation.registration}</p>
        <h1>{dictionary.seo.sucesso.title}</h1>
        <p>Pagamento aprovado. Sua inscrição foi confirmada com sucesso.</p>
        <Link className="cta-button compact" href={`/${locale}`}>
          Voltar para o início
        </Link>
      </section>
    </main>
  );
}

