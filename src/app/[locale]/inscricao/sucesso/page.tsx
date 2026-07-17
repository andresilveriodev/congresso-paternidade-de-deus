import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { assertLocale, supportedLocales } from "@/lib/i18n/locales";
import type { Locale } from "@/types/locale";

const successCopy: Record<Locale, { message: string; back: string }> = {
  pt: { message: "Pagamento aprovado. Sua inscrição foi confirmada com sucesso.", back: "Voltar para o início" },
  en: { message: "Payment approved. Your registration has been successfully confirmed.", back: "Back to home" },
  es: { message: "Pago aprobado. Tu inscripción fue confirmada con éxito.", back: "Volver al inicio" },
  it: { message: "Pagamento approvato. La tua iscrizione è stata confermata con successo.", back: "Torna alla pagina iniziale" }
};

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
  const copy = successCopy[locale];

  return (
    <main className="success-page">
      <section className="payment-card">
        <p className="section-kicker">{dictionary.navigation.registration}</p>
        <h1>{dictionary.seo.sucesso.title}</h1>
        <p>{copy.message}</p>
        <Link className="cta-button compact" href={`/${locale}`}>
          {copy.back}
        </Link>
      </section>
    </main>
  );
}

