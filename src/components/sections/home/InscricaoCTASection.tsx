import { ArrowIcon } from "@/components/ArrowIcon";
import { hotmartCheckoutUrl } from "@/lib/constants/routes";

type InscricaoCTASectionProps = {
  title: string;
  text: string;
  cta: string;
};

export function InscricaoCTASection({ cta, text, title }: InscricaoCTASectionProps) {
  return (
    <section className="section register-band" id="inscricao">
      <h2>{title}</h2>
      <p>{text}</p>
      <a className="cta-button" href={hotmartCheckoutUrl()}>
        <ArrowIcon />
        <span>{cta}</span>
      </a>
    </section>
  );
}

