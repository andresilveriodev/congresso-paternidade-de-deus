"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Drawer } from "@/components/Drawer";
import { SiteMenu } from "@/components/SiteMenu";
import { getInitialLocale, Locale, locales, saveLocale } from "@/lib/i18n";
import { homeCopy } from "@/lib/localized-home";
import { images } from "@/lib/site-data";

type DrawerState = {
  title: string;
  subtitle?: string;
  image?: string;
  text: string;
} | null;

function TextLines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, index) =>
        line.trim() ? <p key={`${line}-${index}`}>{line}</p> : <br key={index} />
      )}
    </>
  );
}

function ScheduleText({ text }: { text: string }) {
  const phrase = "locus theologicus";

  if (!text.includes(phrase)) {
    return <>{text}</>;
  }

  const [before, after] = text.split(phrase);

  return (
    <>
      {before}
      <em>{phrase}</em>
      {after}
    </>
  );
}

function SplitTitle({ first, second }: { first: string; second?: string }) {
  return (
    <h2>
      {first}
      {second ? <span>{second}</span> : null}
    </h2>
  );
}

function SectionMark() {
  return <img alt="" aria-hidden="true" className="section-kicker" src="/figma-assets/Vector.svg" />;
}

export function HomePage() {
  const [locale, setLocale] = useState<Locale>("pt");
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const [scheduleDay, setScheduleDay] = useState(1);
  const [mystery, setMystery] = useState(0);
  const [formation, setFormation] = useState(0);
  const [recommendationGroup, setRecommendationGroup] = useState(0);
  const [recommendationItem, setRecommendationItem] = useState(0);
  const t = locales[locale];
  const copy = homeCopy[locale];
  const recommendationGroups = Object.entries(copy.recommendations);
  const [recommendationGroupLabel, recommendationItems] = recommendationGroups[recommendationGroup] ?? recommendationGroups[0];
  const recommendation = recommendationItems[recommendationItem] ?? recommendationItems[0];

  const updateLocale = (next: Locale) => {
    setLocale(next);
    saveLocale(next);
    setRecommendationGroup(0);
    setRecommendationItem(0);
  };

  useEffect(() => {
    const id = window.setTimeout(() => setLocale(getInitialLocale()), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <header className="site-header home-header">
        <a className="brand" href="#top">
          <img alt="Paternidade de Deus" src={images.markMenu} />
        </a>
        <SiteMenu labels={t.labels} locale={locale} onLocaleChange={updateLocale} />
        <div className="home-language" aria-label={t.labels.language}>
          {[
            ["en", copy.languages.en],
            ["pt", copy.languages.pt],
            ["it", copy.languages.it]
          ].map(([code, label]) => (
            <button
              aria-pressed={locale === code}
              key={code}
              onClick={() => updateLocale(code as Locale)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-media">
            <img alt="" src={images.hero} />
          </div>
          <div className="hero-content">
            <img alt="Paternidade de Deus" className="hero-logo" src={images.markGold} />
            <h1 className="sr-only">{t.hero.title}</h1>
            <p>{copy.hero}</p>
            <Link className="cta-button" href="/inscricao">
              <ArrowIcon />
              <span>{copy.register}</span>
            </Link>
          </div>
        </section>

        <section className="section schedule-section figma-section" id="programacao">
          <div className="figma-title-block">
            <SectionMark />
            <div>
              <h2>{t.labels.schedule}</h2>
              <p>{copy.scheduleSubtitle}</p>
            </div>
          </div>
          <div className="schedule-tabs" aria-label="Dias da programação">
            {copy.schedule.map((day, index) => (
              <button
                aria-pressed={scheduleDay === index}
                key={day.day}
                onClick={() => setScheduleDay(index)}
                type="button"
              >
                <span>{copy.days[index]?.label ?? day.day}</span>
                <strong>{copy.days[index]?.day ?? ""}</strong>
                <small>{copy.days[index]?.month ?? ""}</small>
              </button>
            ))}
          </div>
          <article className="schedule-focus" key={copy.schedule[scheduleDay].day}>
            {copy.schedule[scheduleDay].items.map(([time, text]) => (
              <div className="schedule-row" key={`${copy.schedule[scheduleDay].day}-${time}-${text}`}>
                <time>{time}</time>
                <p>
                  <ScheduleText text={text} />
                </p>
              </div>
            ))}
          </article>
        </section>

        <section className="section mystery-section split-section figma-section" id="misterio">
          <div className="section-heading sticky-heading mystery-heading">
            <SectionMark />
            <SplitTitle first={copy.mysteryTitle[0]} second={copy.mysteryTitle[1]} />
          </div>
          <div className="tab-stage">
            <div className="tab-list">
              {copy.mysteryTabs.map((tab, index) => (
                <button
                  aria-pressed={mystery === index}
                  key={tab.id}
                  onClick={() => setMystery(index)}
                  type="button"
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <article className="tab-panel" key={copy.mysteryTabs[mystery].id}>
              <div>
                <h3>{copy.mysteryTabs[mystery].title}</h3>
                <p>{copy.mysteryTabs[mystery].summary}</p>
                <button
                  className="cta-button compact"
                  onClick={() =>
                    setDrawer({
                      title: copy.mysteryTabs[mystery].title,
                      image: copy.mysteryTabs[mystery].image,
                      text: copy.mysteryTabs[mystery].detail
                    })
                  }
                  type="button"
                >
                  <ArrowIcon />
                  <span>{t.labels.more}</span>
                </button>
              </div>
              <img alt="" src={copy.mysteryTabs[mystery].image} />
            </article>
          </div>
        </section>

        <section className="section split-section formation-section figma-section" id="formacao">
          <div className="section-heading sticky-heading">
            <SectionMark />
            <SplitTitle first={copy.formationTitle[0]} second={copy.formationTitle[1]} />
          </div>
          <div className="tab-stage">
            <div className="tab-list">
              {copy.formationTabs.map((tab, index) => (
                <button
                  aria-pressed={formation === index}
                  key={tab.title}
                  onClick={() => setFormation(index)}
                  type="button"
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <article
              className={`tab-panel${copy.formationTabs[formation].logos ? " formation-panel-with-logos" : ""}`}
              key={copy.formationTabs[formation].title}
            >
              <div>
                <h3>{copy.formationTabs[formation].title}</h3>
                <p>{copy.formationTabs[formation].text}</p>
              </div>
              {copy.formationTabs[formation].logos ? (
                <div className="formation-media">
                  <img alt="" src={copy.formationTabs[formation].image} />
                  <div className="logo-grid formation-logo-strip">
                    {copy.formationTabs[formation].logos?.map((logo) => (
                      <img alt="" key={logo} src={logo} />
                    ))}
                  </div>
                </div>
              ) : (
                <img alt="" src={copy.formationTabs[formation].image} />
              )}
            </article>
          </div>
        </section>

        <section className="section speakers-section figma-section" id="conferencistas">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first={copy.speakersTitle[0]} second={copy.speakersTitle[1]} />
          </div>
          <div className="speaker-grid">
            {copy.speakers.map((speaker) => (
              <button
                className="speaker-card"
                key={speaker.name}
                onClick={() =>
                  setDrawer({
                    title: speaker.name,
                    subtitle: speaker.role,
                    image: speaker.image,
                    text: speaker.bio
                  })
                }
                type="button"
              >
                <span className="speaker-image">
                  <img alt={speaker.name} src={speaker.image} />
                  <span className="popup-arrow">
                    <ArrowIcon />
                  </span>
                </span>
                <span className="speaker-name">{speaker.name}</span>
                <span className="speaker-role">{speaker.role}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section info-section figma-section" id="informacoes">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first={copy.infoTitle[0]} second={copy.infoTitle[1]} />
          </div>
          <div className="info-grid">
            {copy.info.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section location-section figma-section" id="local">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first={copy.locationTitle[0]} second={copy.locationTitle[1]} />
            <div className="location-copy">
              <h3>{copy.location.name}</h3>
              <strong>{copy.location.place}</strong>
              <p>{copy.location.text}</p>
            </div>
          </div>
          <div className="reveal-gallery">
            {[images.aerialNight, images.aerialFront, images.aerialSide, images.sanctuary].map((image) => (
              <img alt="" key={image} src={image} />
            ))}
          </div>
        </section>

        <section className="section split-section figma-section" id="indicacoes">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first={copy.indicationsTitle} />
          </div>
          <div className="tab-stage">
            <div className="recommendation-menu">
              {recommendationGroups.map(([group, items], index) => (
                <div className="recommendation-group" key={group}>
                  <button
                    aria-expanded={recommendationGroup === index}
                    className="recommendation-group-button"
                    onClick={() => {
                      setRecommendationGroup(index);
                      setRecommendationItem(0);
                    }}
                    type="button"
                  >
                    {group}
                  </button>
                  {recommendationGroup === index ? (
                    <div className="recommendation-options">
                      {items.map((item, index) => (
                        <button
                          aria-pressed={recommendationItem === index}
                          key={item.name}
                          onClick={() => setRecommendationItem(index)}
                          type="button"
                        >
                          <span className="recommendation-option-icon">
                            <ArrowIcon />
                          </span>
                          {item.name}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <article className="recommendation-panel" key={`${recommendationGroupLabel}-${recommendationItem}`}>
              <img alt="" src={recommendation.image} />
              <div className="recommendation-copy">
                <h3>{recommendation.name}</h3>
                <p>{recommendation.text}</p>
                <div className="recommendation-actions">
                  <button
                    onClick={() => setDrawer({ title: recommendation.name, image: recommendation.image, text: recommendation.text })}
                    type="button"
                  >
                    <ArrowIcon />
                    <span>{t.labels.more}</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section papers-section figma-section" id="trabalhos">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first={copy.papersTitle[0]} second={copy.papersTitle[1]} />
          </div>
          <div className="papers-copy">
            <h3>{copy.papersHeading}</h3>
            <p>
              {copy.papers.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="section rules-section figma-section" id="regulamento">
          <div className="section-heading">
            <SectionMark />
            <h2>{t.labels.rules}</h2>
          </div>
          <div className="rule-grid">
            {copy.ruleCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                {card.hideMoreButton ? null : (
                  <button
                    className="cta-button compact"
                    onClick={() => setDrawer({ title: card.title, text: card.detail })}
                    type="button"
                  >
                    <ArrowIcon />
                    <span>{t.labels.more}</span>
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section register-band" id="inscricao">
          <h2>{t.labels.registration}</h2>
          <p>{copy.registerBand}</p>
          <Link className="cta-button" href="/inscricao">
            <ArrowIcon />
            <span>{t.labels.registerNow}</span>
          </Link>
        </section>
      </main>

      <footer className="footer">
        <img alt="Paternidade de Deus" src={images.markDark} />
        <p>{copy.footer}</p>
      </footer>

      <Drawer
        closeLabel={t.labels.close}
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
