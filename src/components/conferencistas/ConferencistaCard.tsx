import { ArrowIcon } from "@/components/ArrowIcon";

type ConferencistaCardProps = {
  speaker: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  onOpen: () => void;
};

export function ConferencistaCard({ onOpen, speaker }: ConferencistaCardProps) {
  return (
    <button className="speaker-card" onClick={onOpen} type="button">
      <span className="speaker-image">
        <img alt={speaker.name} src={speaker.image} />
        <span className="popup-arrow">
          <ArrowIcon />
        </span>
      </span>
      <span className="speaker-name">{speaker.name}</span>
      <span className="speaker-role">{speaker.role}</span>
    </button>
  );
}

