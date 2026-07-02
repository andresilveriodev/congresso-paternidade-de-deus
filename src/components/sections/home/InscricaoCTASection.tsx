import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import type { Locale } from "@/types/locale";
import { registrationPath } from "@/lib/constants/routes";

type InscricaoCTASectionProps = {
  locale: Locale;
  title: string;
  text: string;
  cta: string;
};

export function InscricaoCTASection({ cta, locale, text, title }: InscricaoCTASectionProps) {
  return (
    <section className="section register-band" id="inscricao">
      <h2>{title}</h2>
      <p>{text}</p>
      <Link className="cta-button" href={registrationPath(locale)}>
        <ArrowIcon />
        <span>{cta}</span>
      </Link>
    </section>
  );
}

