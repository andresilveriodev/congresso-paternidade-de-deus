"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Drawer } from "@/components/Drawer";
import { SiteMenu } from "@/components/SiteMenu";
import { getInitialLocale, Locale, locales, saveLocale } from "@/lib/i18n";
import {
  formationTabs,
  images,
  logos,
  mysteryTabs,
  recommendations,
  ruleCards,
  schedule,
  speakers
} from "@/lib/site-data";

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
  const [recommendationGroup, setRecommendationGroup] = useState<keyof typeof recommendations>("Hotéis");
  const [recommendationItem, setRecommendationItem] = useState(0);
  const t = locales[locale];

  const updateLocale = (next: Locale) => {
    setLocale(next);
    saveLocale(next);
  };

  const recommendation = recommendations[recommendationGroup][recommendationItem];

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
            ["en", "Inglês"],
            ["pt", "Português"],
            ["it", "Italiano"]
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
            <p>
              {locale === "pt" ? (
                <>
                  Uma jornada de fé no coração da devoção ao <strong>Pai Eterno</strong>
                </>
              ) : (
                t.hero.subtitle
              )}
            </p>
            <Link className="cta-button" href="/inscricao">
              <ArrowIcon />
              <span>Fazer Inscrição</span>
            </Link>
          </div>
        </section>

        <section className="section schedule-section figma-section" id="programacao">
          <div className="figma-title-block">
            <SectionMark />
            <div>
              <h2>{t.labels.schedule}</h2>
              <p>5 Dias de imersão teológica</p>
            </div>
          </div>
          <div className="schedule-tabs" aria-label="Dias da programação">
            {schedule.map((day, index) => (
              <button
                aria-pressed={scheduleDay === index}
                key={day.day}
                onClick={() => setScheduleDay(index)}
                type="button"
              >
                <span>{day.day.split("—")[1]?.trim().replace("-feira", "") ?? "Dia"}</span>
                <strong>{day.day.match(/\d{2}/)?.[0]}</strong>
                <small>Novembro</small>
              </button>
            ))}
          </div>
          <article className="schedule-focus" key={schedule[scheduleDay].day}>
            {schedule[scheduleDay].items.map(([time, text]) => (
              <div className="schedule-row" key={`${schedule[scheduleDay].day}-${time}-${text}`}>
                <time>{time}</time>
                <p>{text}</p>
              </div>
            ))}
          </article>
        </section>

        <section className="section mystery-section split-section figma-section" id="misterio">
          <div className="section-heading sticky-heading mystery-heading">
            <SectionMark />
            <SplitTitle first="Mistério, Ternura" second="e Missão da Igreja" />
          </div>
          <div className="tab-stage">
            <div className="tab-list">
              {mysteryTabs.map((tab, index) => (
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
            <article className="tab-panel" key={mysteryTabs[mystery].id}>
              <div>
                <h3>{mysteryTabs[mystery].title}</h3>
                <p>{mysteryTabs[mystery].summary}</p>
                <button
                  className="cta-button compact"
                  onClick={() =>
                    setDrawer({
                      title: mysteryTabs[mystery].title,
                      image: mysteryTabs[mystery].image,
                      text: mysteryTabs[mystery].detail
                    })
                  }
                  type="button"
                >
                  <ArrowIcon />
                  <span>{t.labels.more}</span>
                </button>
              </div>
              <img alt="" src={mysteryTabs[mystery].image} />
            </article>
          </div>
        </section>

        <section className="section split-section formation-section figma-section" id="formacao">
          <div className="section-heading sticky-heading">
            <SectionMark />
            <SplitTitle first="Pesquisa Teológica" second="Formação Eclesial" />
          </div>
          <div className="tab-stage">
            <div className="tab-list">
              {formationTabs.map((tab, index) => (
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
              className={`tab-panel${formationTabs[formation].logos ? " formation-panel-with-logos" : ""}`}
              key={formationTabs[formation].title}
            >
              <div>
                <h3>{formationTabs[formation].title}</h3>
                <p>{formationTabs[formation].text}</p>
              </div>
              {formationTabs[formation].logos ? (
                <div className="formation-media">
                  <img alt="" src={formationTabs[formation].image} />
                  <div className="logo-grid formation-logo-strip">
                    {formationTabs[formation].logos?.map((logo) => (
                      <img alt="" key={logo} src={logo} />
                    ))}
                  </div>
                </div>
              ) : (
                <img alt="" src={formationTabs[formation].image} />
              )}
            </article>
          </div>
        </section>

        <section className="section speakers-section figma-section" id="conferencistas">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first="Conferencistas" second="e produção acadêmica" />
          </div>
          <div className="speaker-grid">
            {speakers.map((speaker) => (
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
            <SplitTitle first="Informações" second="gerais" />
          </div>
          <div className="info-grid">
            <article>
              <span>Carga horária</span>
              <p>40 horas.</p>
            </article>
            <article>
              <span>Certificado</span>
              <p>Será fornecido certificado a todos os que tiverem, no mínimo, 75% de frequência.</p>
            </article>
            <article>
              <span>Valor da Inscrição</span>
              <p>R$ 350,00</p>
            </article>
          </div>
        </section>

        <section className="section location-section figma-section" id="local">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first="Local do" second="evento" />
            <div className="location-copy">
              <h3>Santuário Basílica do Divino Pai Eterno</h3>
              <strong>Trindade, Goiás, Brasil</strong>
              <p>
                Um lugar de fé, acolhimento e espiritualidade, que nos inspira a contemplar o mistério da
                Paternidade de Deus
              </p>
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
            <SplitTitle first="Indicações" />
          </div>
          <div className="tab-stage">
            <div className="recommendation-menu">
              {(Object.keys(recommendations) as Array<keyof typeof recommendations>).map((group) => (
                <div className="recommendation-group" key={group}>
                  <button
                    aria-expanded={recommendationGroup === group}
                    className="recommendation-group-button"
                    onClick={() => {
                      setRecommendationGroup(group);
                      setRecommendationItem(0);
                    }}
                    type="button"
                  >
                    {group}
                  </button>
                  {recommendationGroup === group ? (
                    <div className="recommendation-options">
                      {recommendations[group].map((item, index) => (
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
            <article className="recommendation-panel" key={`${recommendationGroup}-${recommendationItem}`}>
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
                    <span>Mais informação</span>
                  </button>
                  <button
                    aria-label="Whatsapp"
                    onClick={() => setDrawer({ title: recommendation.name, image: recommendation.image, text: recommendation.text })}
                    type="button"
                  >
                    <span>Whatsapp</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section papers-section figma-section" id="trabalhos">
          <div className="section-heading">
            <SectionMark />
            <SplitTitle first="Trabalhos" second="científicos" />
          </div>
          <div className="papers-copy">
            <h3>Eixos temáticos sugeridos para comunicações científicas</h3>
            <p>
              Teologia Trinitária e Ontologia
              <br />
              Exegese e Teologia Bíblica da Filiação
              <br />
              Cristologia: o Filho revelador do Pai
              <br />
              Pneumatologia: o Espírito que clama &quot;Abbá&quot;
              <br />
              Antropologia Teológica da Paternidade
              <br />
              Teologia Espiritual e Mística
              <br />
              Mariologia: Maria e o mistério da Paternidade
              <br />
              Liturgia e Expressões Artísticas
              <br />
              Piedade Popular e Sensus Fidei
              <br />
              Teologia Pastoral e Evangelização
              <br />
              Paternidade e Fraternidade Universal: Perspectivas Ecumênicas e Inter-religiosas
              <br />
              Diálogos interdisciplinares sobre a devoção ao Divino Pai Eterno
            </p>
          </div>
        </section>

        <section className="section rules-section figma-section" id="regulamento">
          <div className="section-heading">
            <SectionMark />
            <h2>{t.labels.rules}</h2>
          </div>
          <div className="rule-grid">
            {ruleCards.map((card) => (
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
          <p>Participe deste encontro internacional de fé, teologia e devoção no Santuário Basílica do Divino Pai Eterno, em Trindade-GO.</p>
          <Link className="cta-button" href="/inscricao">
            <ArrowIcon />
            <span>{t.labels.registerNow}</span>
          </Link>
        </section>
      </main>

      <footer className="footer">
        <img alt="Paternidade de Deus" src={images.markDark} />
        <p>Todos direitos reservado Paternidade de Deus @2026</p>
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
