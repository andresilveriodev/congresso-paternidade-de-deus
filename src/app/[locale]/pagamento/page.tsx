import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";
import { successPath } from "@/lib/constants/routes";
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
    title: dictionary.seo.pagamento.title,
    description: dictionary.seo.pagamento.description
  };
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ inscricaoId?: string }>;
}) {
  const { locale: localeParam } = await params;
  const { inscricaoId } = await searchParams;
  const locale = assertLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <main className="payment-page">
      <section className="payment-card">
        <p className="section-kicker">{dictionary.navigation.registration}</p>
        <h1>{dictionary.seo.pagamento.title}</h1>
        {inscricaoId ? (
          <>
            <dl>
              <div>
                <dt>Identificador</dt>
                <dd>{inscricaoId}</dd>
              </div>
              <div>
                <dt>Congresso</dt>
                <dd>{siteConfig.eventName}</dd>
              </div>
              <div>
                <dt>Valor</dt>
                <dd>{siteConfig.price}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>aguardando_pagamento</dd>
              </div>
            </dl>
            <p>
              A inscrição foi recebida e permanecerá aguardando pagamento até a confirmação financeira.
            </p>
            <Link className="cta-button" href={successPath(locale)}>
              Confirmar pagamento
            </Link>
          </>
        ) : (
          <>
            <p>Não encontramos um identificador de inscrição válido para iniciar o pagamento.</p>
            <Link className="cta-button compact" href={`/${locale}/inscricao`}>
              Voltar para inscrição
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

