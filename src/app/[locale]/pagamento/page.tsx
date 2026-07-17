import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";
import { successPath } from "@/lib/constants/routes";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { assertLocale, supportedLocales } from "@/lib/i18n/locales";
import type { Locale } from "@/types/locale";

const paymentCopy: Record<Locale, {
  congress: string;
  confirm: string;
  eventName: string;
  identifier: string;
  invalid: string;
  pending: string;
  status: string;
  value: string;
  back: string;
}> = {
  pt: { congress: "Congresso", confirm: "Confirmar pagamento", eventName: siteConfig.eventName, identifier: "Identificador", invalid: "Não encontramos um identificador de inscrição válido para iniciar o pagamento.", pending: "A inscrição foi recebida e permanecerá aguardando pagamento até a confirmação financeira.", status: "Status", value: "Valor", back: "Voltar para inscrição" },
  en: { congress: "Congress", confirm: "Confirm payment", eventName: "1st International Theology Congress on the Fatherhood of God", identifier: "Identifier", invalid: "We could not find a valid registration identifier to start payment.", pending: "The registration was received and will remain pending until payment is confirmed.", status: "Status", value: "Price", back: "Back to registration" },
  es: { congress: "Congreso", confirm: "Confirmar pago", eventName: "I Congreso Internacional de Teología sobre la Paternidad de Dios", identifier: "Identificador", invalid: "No encontramos un identificador de inscripción válido para iniciar el pago.", pending: "La inscripción fue recibida y permanecerá pendiente hasta la confirmación del pago.", status: "Estado", value: "Valor", back: "Volver a la inscripción" },
  it: { congress: "Congresso", confirm: "Conferma pagamento", eventName: "1° Congresso Internazionale di Teologia sulla Paternità di Dio", identifier: "Identificativo", invalid: "Non abbiamo trovato un identificativo di iscrizione valido per avviare il pagamento.", pending: "L'iscrizione è stata ricevuta e resterà in attesa fino alla conferma del pagamento.", status: "Stato", value: "Importo", back: "Torna all'iscrizione" }
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
  const copy = paymentCopy[locale];

  return (
    <main className="payment-page">
      <section className="payment-card">
        <p className="section-kicker">{dictionary.navigation.registration}</p>
        <h1>{dictionary.seo.pagamento.title}</h1>
        {inscricaoId ? (
          <>
            <dl>
              <div>
                <dt>{copy.identifier}</dt>
                <dd>{inscricaoId}</dd>
              </div>
              <div>
                <dt>{copy.congress}</dt>
                <dd>{copy.eventName}</dd>
              </div>
              <div>
                <dt>{copy.value}</dt>
                <dd>{siteConfig.price}</dd>
              </div>
              <div>
                <dt>{copy.status}</dt>
                <dd>aguardando_pagamento</dd>
              </div>
            </dl>
            <p>{copy.pending}</p>
            <Link className="cta-button" href={successPath(locale)}>
              {copy.confirm}
            </Link>
          </>
        ) : (
          <>
            <p>{copy.invalid}</p>
            <Link className="cta-button compact" href={`/${locale}/inscricao`}>
              {copy.back}
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

