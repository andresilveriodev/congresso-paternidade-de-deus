import { ConferencistaCard } from "@/components/conferencistas/ConferencistaCard";

type ConferencistasGridProps = {
  speakers: Array<{
    name: string;
    role: string;
    image: string;
    bio: string;
  }>;
  onOpenSpeaker: (speaker: ConferencistasGridProps["speakers"][number]) => void;
};

export function ConferencistasGrid({ onOpenSpeaker, speakers }: ConferencistasGridProps) {
  return (
    <div className="speaker-grid">
      {speakers.map((speaker) => (
        <ConferencistaCard key={speaker.name} onOpen={() => onOpenSpeaker(speaker)} speaker={speaker} />
      ))}
    </div>
  );
}

