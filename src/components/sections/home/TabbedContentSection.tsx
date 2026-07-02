"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { SectionMark } from "@/components/sections/shared/SectionMark";
import { SplitTitle } from "@/components/sections/shared/SplitTitle";

type TabItem = {
  id?: string;
  title: string;
  image: string;
  summary?: string;
  text?: string;
  detail?: string;
  logos?: string[];
};

type TabbedContentSectionProps = {
  id: string;
  className: string;
  title: [string, string];
  tabs: TabItem[];
  moreLabel?: string;
  onOpenDetail?: (item: TabItem) => void;
};

function renderInlineText(text?: string) {
  if (!text) {
    return null;
  }

  return text.split(/(<span>.*?<\/span>)/g).map((part, index) => {
    if (part.startsWith("<span>") && part.endsWith("</span>")) {
      return (
        <span className="tab-text-highlight" key={`${part}-${index}`}>
          {part.replace("<span>", "").replace("</span>", "")}
        </span>
      );
    }

    return part;
  });
}

export function TabbedContentSection({
  className,
  id,
  moreLabel,
  onOpenDetail,
  tabs,
  title
}: TabbedContentSectionProps) {
  const [selected, setSelected] = useState(0);
  const [previousTabImage, setPreviousTabImage] = useState<string | null>(null);
  const [tabImageTransition, setTabImageTransition] = useState(0);
  const isMysterySection = id === "misterio";
  const usesImageTransition = isMysterySection || id === "formacao";
  const tab = tabs[selected] ?? tabs[0];

  function handleTabSelect(index: number) {
    if (index === selected) {
      return;
    }

    if (usesImageTransition) {
      setPreviousTabImage(tab.image);
      setTabImageTransition((value) => value + 1);
    }

    setSelected(index);
  }

  return (
    <section className={`section split-section figma-section ${className}`} id={id}>
      <div className={`section-heading sticky-heading${id === "misterio" ? " mystery-heading" : ""}`}>
        <SectionMark />
        <SplitTitle first={title[0]} second={title[1]} />
      </div>
      <div className="tab-stage">
        <div className="tab-list">
          {tabs.map((item, index) => (
            <button
              aria-pressed={selected === index}
              key={item.id ?? item.title}
              onClick={() => handleTabSelect(index)}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
        <article className={`tab-panel${tab.logos ? " formation-panel-with-logos" : ""}`} key={tab.id ?? tab.title}>
          <div>
            <h3>{tab.title}</h3>
            <p>{renderInlineText(tab.summary ?? tab.text)}</p>
            {onOpenDetail && tab.detail && moreLabel ? (
              <button className="cta-button compact" onClick={() => onOpenDetail(tab)} type="button">
                <ArrowIcon />
                <span>{moreLabel}</span>
              </button>
            ) : null}
          </div>
          {tab.logos ? (
            <div className="formation-media">
              <div className="tab-image-stack">
                {previousTabImage ? <img alt="" className="tab-image previous" src={previousTabImage} /> : null}
                <img
                  alt=""
                  className={`tab-image current${previousTabImage ? " is-entering" : ""}`}
                  key={`${tab.image}-${tabImageTransition}`}
                  src={tab.image}
                />
              </div>
              <div className="logo-grid formation-logo-strip">
                {tab.logos.map((logo) => (
                  <img alt="" key={logo} src={logo} />
                ))}
              </div>
            </div>
          ) : usesImageTransition ? (
            <div className="tab-image-stack">
              {previousTabImage ? <img alt="" className="tab-image previous" src={previousTabImage} /> : null}
              <img
                alt=""
                className={`tab-image current${previousTabImage ? " is-entering" : ""}`}
                key={`${tab.image}-${tabImageTransition}`}
                src={tab.image}
              />
            </div>
          ) : (
            <img alt="" src={tab.image} />
          )}
        </article>
      </div>
    </section>
  );
}
