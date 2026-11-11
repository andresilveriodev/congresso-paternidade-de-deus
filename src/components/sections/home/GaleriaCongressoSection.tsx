import { GaleriaFotos } from "@/components/congresso/GaleriaFotos";
import { GaleriaVideos } from "@/components/congresso/GaleriaVideos";
import { SectionMark } from "@/components/sections/shared/SectionMark";
import { SplitTitle } from "@/components/sections/shared/SplitTitle";
import { galleryCopy } from "@/content/gallery";
import type { Locale } from "@/types/locale";

export function GaleriaCongressoSection({ locale }: { locale: Locale }) {
  const copy = galleryCopy[locale];
  return <section aria-label={`${copy.title} ${copy.subtitle}`} className="section figma-section congress-gallery" id="galeria">
    <div className="section-heading">
      <SectionMark />
      <div><SplitTitle first={copy.title} second={copy.subtitle} /><p className="gallery-intro">{copy.intro}</p></div>
    </div>
    <div className="gallery-content"><GaleriaFotos copy={copy} /><GaleriaVideos copy={copy} /></div>
  </section>;
}
