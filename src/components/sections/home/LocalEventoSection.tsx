import { SectionMark } from "@/components/sections/shared/SectionMark";
import { SplitTitle } from "@/components/sections/shared/SplitTitle";

type LocalEventoSectionProps = {
  gallery: string[];
  location: {
    name: string;
    place: string;
    text: string;
  };
  title: [string, string];
};

export function LocalEventoSection({ gallery, location, title }: LocalEventoSectionProps) {
  return (
    <section className="section location-section figma-section" id="local">
      <div className="section-heading">
        <SectionMark />
        <SplitTitle first={title[0]} second={title[1]} />
        <div className="location-copy">
          <h3>{location.name}</h3>
          <strong>{location.place}</strong>
          <p>{location.text}</p>
        </div>
      </div>
      <div className="reveal-gallery">
        {gallery.map((image) => (
          <img alt="" key={image} src={image} />
        ))}
      </div>
    </section>
  );
}

