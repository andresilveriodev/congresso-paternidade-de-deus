import { ArrowIcon } from "@/components/ArrowIcon";
import { hotmartCheckoutUrl } from "@/lib/constants/routes";

type HeroSectionProps = {
  background: string;
  logo: string;
  title: string;
  subtitle: React.ReactNode;
  cta: string;
};

export function HeroSection({ background, cta, logo, subtitle, title }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-media">
        <img alt="" src={background} />
      </div>
      <div className="hero-content">
        <img alt="Paternidade de Deus" className="hero-logo" src={logo} />
        <h1 className="sr-only">{title}</h1>
        <p>{subtitle}</p>
        <a className="cta-button" href={hotmartCheckoutUrl()}>
          <ArrowIcon />
          <span>{cta}</span>
        </a>
      </div>
    </section>
  );
}

