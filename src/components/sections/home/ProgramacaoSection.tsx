import { ProgramacaoTabs } from "@/components/programacao/ProgramacaoTabs";
import { SectionMark } from "@/components/sections/shared/SectionMark";

type ProgramacaoSectionProps = {
  title: string;
  subtitle: string;
  days: Array<{ label: string; day: string; month: string }>;
  schedule: Array<{ day: string; items: string[][] }>;
};

export function ProgramacaoSection({ days, schedule, subtitle, title }: ProgramacaoSectionProps) {
  return (
    <section className="section schedule-section figma-section" id="programacao">
      <div className="figma-title-block">
        <SectionMark />
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <ProgramacaoTabs days={days} schedule={schedule} />
    </section>
  );
}

