"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { SectionMark } from "@/components/sections/shared/SectionMark";
import { SplitTitle } from "@/components/sections/shared/SplitTitle";

type RecommendationItem = { name: string; image: string; text: string };

type IndicacoesSectionProps = {
  title: string;
  recommendations: Record<string, RecommendationItem[]>;
  moreLabel: string;
  onOpenRecommendation: (item: RecommendationItem) => void;
};

export function IndicacoesSection({
  moreLabel,
  onOpenRecommendation,
  recommendations,
  title
}: IndicacoesSectionProps) {
  const [recommendationGroup, setRecommendationGroup] = useState(0);
  const [recommendationItem, setRecommendationItem] = useState(0);
  const recommendationGroups = Object.entries(recommendations);
  const [recommendationGroupLabel, recommendationItems] =
    recommendationGroups[recommendationGroup] ?? recommendationGroups[0];
  const recommendation = recommendationItems[recommendationItem] ?? recommendationItems[0];

  return (
    <section className="section split-section figma-section" id="indicacoes">
      <div className="section-heading">
        <SectionMark />
        <SplitTitle first={title} />
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
                  {items.map((item, itemIndex) => (
                    <button
                      aria-pressed={recommendationItem === itemIndex}
                      key={item.name}
                      onClick={() => setRecommendationItem(itemIndex)}
                      type="button"
                    >
                      <span className="recommendation-option-icon">
                        <ArrowIcon />
                      </span>
                      <span className="recommendation-option-label">{item.name}</span>
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
              <button onClick={() => onOpenRecommendation(recommendation)} type="button">
                <ArrowIcon />
                <span>{moreLabel}</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
