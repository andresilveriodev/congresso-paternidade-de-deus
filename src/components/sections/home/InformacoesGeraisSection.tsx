import { SectionMark } from "@/components/sections/shared/SectionMark";
import { SplitTitle } from "@/components/sections/shared/SplitTitle";

export function InformacoesGeraisSection({
  info,
  title
}: {
  info: Array<[string, string]>;
  title: [string, string];
}) {
  return (
    <section className="section info-section figma-section" id="informacoes">
      <div className="section-heading">
        <SectionMark />
        <SplitTitle first={title[0]} second={title[1]} />
      </div>
      <div className="info-grid">
        {info.map(([itemTitle, text]) => (
          <article key={itemTitle}>
            <span>{itemTitle}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

