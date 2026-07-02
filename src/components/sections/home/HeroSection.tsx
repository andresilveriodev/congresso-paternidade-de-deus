import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import type { Locale } from "@/types/locale";
import { registrationPath } from "@/lib/constants/routes";

type HeroSectionProps = {
  background: string;
  logo: string;
  title: string;
  subtitle: React.ReactNode;
  cta: string;
  locale: Locale;
};

export function HeroSection({ background, cta, locale, logo, subtitle, title }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-media">
        <img alt="" src={background} />
      </div>
      <div className="hero-content">
        <img alt="Paternidade de Deus" className="hero-logo" src={logo} />
        <h1 className="sr-only">{title}</h1>
        <p>{subtitle}</p>
        <Link className="cta-button" href={registrationPath(locale)}>
          <ArrowIcon />
          <span>{cta}</span>
        </Link>
      </div>
    </section>
  );
}

