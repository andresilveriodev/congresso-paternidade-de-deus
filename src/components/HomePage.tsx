"use client";

import { useState } from "react";
import { Drawer } from "@/components/Drawer";
import { getLegalFooterLinks } from "@/content/legal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ConferencistasSection } from "@/components/sections/home/ConferencistasSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IndicacoesSection } from "@/components/sections/home/IndicacoesSection";
import { InformacoesGeraisSection } from "@/components/sections/home/InformacoesGeraisSection";
import { InscricaoCTASection } from "@/components/sections/home/InscricaoCTASection";
import { LocalEventoSection } from "@/components/sections/home/LocalEventoSection";
import { ProgramacaoSection } from "@/components/sections/home/ProgramacaoSection";
import { RegulamentoSection } from "@/components/sections/home/RegulamentoSection";
import { TabbedContentSection } from "@/components/sections/home/TabbedContentSection";
import { TrabalhosCientificosSection } from "@/components/sections/home/TrabalhosCientificosSection";
import type { HomeCopy } from "@/lib/localized-home";
import { images } from "@/lib/site-data";
import type { Locale } from "@/types/locale";

type DrawerState = {
  title: string;
  subtitle?: string;
  image?: string;
  text: string;
} | null;

type HomePageProps = {
  locale: Locale;
  labels: Record<string, string>;
  home: HomeCopy;
};

function TextLines({ text }: { text: string }) {
  function renderInlineText(line: string) {
    return line.split(/(<span>.*?<\/span>)/g).map((part, index) => {
      if (part.startsWith("<span>") && part.endsWith("</span>")) {
        return (
          <span className="drawer-text-highlight" key={`${part}-${index}`}>
            {part.replace("<span>", "").replace("</span>", "")}
          </span>
        );
      }

      return part;
    });
  }

  return (
    <>
      {text.split("\n").map((line, index) => {
        const trimmedLine = line.trim();
        const isHighlightLine = /^<span>.*<\/span>$/.test(trimmedLine);

        return trimmedLine ? (
          <p className={isHighlightLine ? "drawer-highlight-line" : undefined} key={`${line}-${index}`}>
            {renderInlineText(line)}
          </p>
        ) : (
          <br key={index} />
        );
      })}
    </>
  );
}

export function HomePage({ home, labels, locale }: HomePageProps) {
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const legalLinks = getLegalFooterLinks(locale);
  const showIndications = false;

  return (
    <>
      <Header
        brandAlt="Paternidade de Deus"
        brandHref={`/${locale}`}
        brandImage={images.markMenu}
        labels={labels}
        languageLabels={home.languages}
        locale={locale}
        mobileBrandImage={images.markMenuMobile}
      />

      <main id="top">
        <HeroSection
          background={images.hero}
          cta={home.register}
          locale={locale}
          logo={images.markGold}
          subtitle={home.hero}
          title={labels.registration}
        />
        <ProgramacaoSection
          days={home.days}
          schedule={home.schedule}
          subtitle={home.scheduleSubtitle}
          title={labels.schedule}
        />
        <TabbedContentSection
          className="mystery-section"
          id="misterio"
          moreLabel={labels.more}
          onOpenDetail={(tab) => setDrawer({ title: tab.title, image: tab.image, text: tab.detail ?? "" })}
          tabs={home.mysteryTabs}
          title={home.mysteryTitle}
        />
        <TabbedContentSection
          className="formation-section"
          id="formacao"
          moreLabel={labels.more}
          onOpenDetail={(tab) => setDrawer({ title: tab.title, image: tab.image, text: tab.detail ?? "" })}
          tabs={home.formationTabs}
          title={home.formationTitle}
        />
        <ConferencistasSection
          onOpenSpeaker={(speaker) =>
            setDrawer({ title: speaker.name, subtitle: speaker.role, image: speaker.image, text: speaker.bio })
          }
          speakers={home.speakers}
          title={home.speakersTitle}
        />
        <InformacoesGeraisSection info={home.info} title={home.infoTitle} />
        <LocalEventoSection
          gallery={[images.aerialNight, images.aerialFront, images.aerialSide, images.sanctuary]}
          location={home.location}
          title={home.locationTitle}
        />
        {showIndications && (
          <IndicacoesSection
            moreLabel={labels.more}
            onOpenRecommendation={(recommendation) =>
              setDrawer({ title: recommendation.name, image: recommendation.image, text: recommendation.text })
            }
            recommendations={home.recommendations}
            title={home.indicationsTitle}
          />
        )}
        <TrabalhosCientificosSection
          heading={home.papersHeading}
          items={home.papers}
          title={home.papersTitle}
        />
        <RegulamentoSection
          cards={home.ruleCards}
          moreLabel={labels.more}
          onOpenRule={(card) => setDrawer({ title: card.title, text: card.detail })}
          title={labels.rules}
        />
        <InscricaoCTASection
          cta={labels.registerNow}
          locale={locale}
          text={home.registerBand}
          title={labels.registration}
        />
      </main>

      <Footer
        links={legalLinks.map((link) => ({ href: `/${locale}/${link.href}`, label: link.label }))}
        logo={images.markDark}
        text={home.footer}
      />

      <Drawer
        closeLabel={labels.close}
        image={drawer?.image}
        onClose={() => setDrawer(null)}
        open={Boolean(drawer)}
        subtitle={drawer?.subtitle}
        title={drawer?.title ?? ""}
      >
        <TextLines text={drawer?.text ?? ""} />
      </Drawer>
    </>
  );
}
