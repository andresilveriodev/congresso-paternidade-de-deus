import { ConferencistasGrid } from "@/components/conferencistas/ConferencistasGrid";
import { SectionMark } from "@/components/sections/shared/SectionMark";
import { SplitTitle } from "@/components/sections/shared/SplitTitle";

type Speaker = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

type ConferencistasSectionProps = {
  title: [string, string];
  speakers: Speaker[];
  onOpenSpeaker: (speaker: Speaker) => void;
};

export function ConferencistasSection({ onOpenSpeaker, speakers, title }: ConferencistasSectionProps) {
  return (
    <section className="section speakers-section figma-section" id="conferencistas">
      <div className="section-heading">
        <SectionMark />
        <SplitTitle first={title[0]} second={title[1]} />
      </div>
      <ConferencistasGrid onOpenSpeaker={onOpenSpeaker} speakers={speakers} />
    </section>
  );
}

