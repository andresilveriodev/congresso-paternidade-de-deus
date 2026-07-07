import Link from "next/link";
import { getLegalFooterLinks, type LegalPageCopy } from "@/content/legal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { images } from "@/lib/site-data";
import type { Locale } from "@/types/locale";

type LegalPageProps = {
  copy: LegalPageCopy;
  labels: Record<string, string>;
  locale: Locale;
};

export function LegalPage({ copy, labels, locale }: LegalPageProps) {
  const legalLinks = getLegalFooterLinks(locale);
  const headerLabels = {
    ...labels,
    registration: locale === "pt" ? "Inscrição" : labels.registration,
    schedule: locale === "pt" ? "Programação" : labels.schedule,
    speakers: locale === "pt" ? "Conferencistas" : labels.speakers,
    papers: locale === "pt" ? "Trabalho científico" : labels.papers,
    location: locale === "pt" ? "Local" : labels.location,
    language: locale === "pt" ? "Idioma" : labels.language
  };

  return (
    <>
      <Header
        brandAlt="Paternidade de Deus"
        brandHref={`/${locale}`}
        brandImage={images.markRegistration}
        labels={headerLabels}
        languagePathSuffix={`/${copy.slug}`}
        locale={locale}
        variant="registration"
      />

      <main className="legal-page">
        <section className="legal-hero" aria-labelledby="legal-title">
          <h1 id="legal-title">{copy.title}</h1>
          <p>{copy.description}</p>
        </section>

        <div className="legal-shell">
          <aside className="legal-nav" aria-label={locale === "pt" ? "Páginas legais" : "Legal pages"}>
            {legalLinks.map((link) => (
              <Link
                aria-current={copy.slug === link.href ? "page" : undefined}
                href={`/${locale}/${link.href}`}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </aside>

          <article className="legal-article">
            <p className="legal-updated">{copy.updatedAt}</p>
            {copy.sections.map((section) => (
              <section className="legal-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </main>

      <Footer
        links={legalLinks.map((link) => ({ href: `/${locale}/${link.href}`, label: link.label }))}
        logo={images.markDark}
        text="I Congresso Internacional de Teologia sobre a Paternidade de Deus"
      />
    </>
  );
}
