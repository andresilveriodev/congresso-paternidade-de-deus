import { RegulamentoCard } from "@/components/trabalhos/RegulamentoCard";
import { SectionMark } from "@/components/sections/shared/SectionMark";

type RuleCard = {
  title: string;
  summary: string;
  detail: string;
  hideMoreButton?: boolean;
};

type RegulamentoSectionProps = {
  title: string;
  cards: RuleCard[];
  moreLabel: string;
  onOpenRule: (card: RuleCard) => void;
};

export function RegulamentoSection({ cards, moreLabel, onOpenRule, title }: RegulamentoSectionProps) {
  return (
    <section className="section rules-section figma-section" id="regulamento">
      <div className="section-heading">
        <SectionMark />
        <h2>{title}</h2>
      </div>
      <div className="rule-grid">
        {cards.map((card) => (
          <RegulamentoCard card={card} key={card.title} moreLabel={moreLabel} onOpen={() => onOpenRule(card)} />
        ))}
      </div>
    </section>
  );
}

