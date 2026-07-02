import { EixosTematicosList } from "@/components/trabalhos/EixosTematicosList";
import { SectionMark } from "@/components/sections/shared/SectionMark";
import { SplitTitle } from "@/components/sections/shared/SplitTitle";

type TrabalhosCientificosSectionProps = {
  heading: string;
  items: string[];
  title: [string, string];
};

export function TrabalhosCientificosSection({ heading, items, title }: TrabalhosCientificosSectionProps) {
  return (
    <section className="section papers-section figma-section" id="trabalhos">
      <div className="section-heading">
        <SectionMark />
        <SplitTitle first={title[0]} second={title[1]} />
      </div>
      <div className="papers-copy">
        <h3>{heading}</h3>
        <EixosTematicosList items={items} />
      </div>
    </section>
  );
}

