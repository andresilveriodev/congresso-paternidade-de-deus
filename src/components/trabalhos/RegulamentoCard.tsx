import { ArrowIcon } from "@/components/ArrowIcon";

type RegulamentoCardProps = {
  card: {
    title: string;
    summary: string;
    detail: string;
    hideMoreButton?: boolean;
  };
  moreLabel: string;
  onOpen: () => void;
};

function renderInlineText(text: string) {
  return text.split(/(<span>.*?<\/span>)/g).map((part, index) => {
    if (part.startsWith("<span>") && part.endsWith("</span>")) {
      return (
        <span className="rule-text-highlight" key={`${part}-${index}`}>
          {part.replace("<span>", "").replace("</span>", "")}
        </span>
      );
    }

    return part;
  });
}

export function RegulamentoCard({ card, moreLabel, onOpen }: RegulamentoCardProps) {
  return (
    <article>
      <h3>{card.title}</h3>
      <p>{renderInlineText(card.summary)}</p>
      {card.hideMoreButton ? null : (
        <button className="cta-button compact" onClick={onOpen} type="button">
          <ArrowIcon />
          <span>{moreLabel}</span>
        </button>
      )}
    </article>
  );
}
