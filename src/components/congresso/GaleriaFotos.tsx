"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryCopy } from "@/content/gallery";
import type { PhotoGalleryData } from "@/types/congresso";
import { GalleryModal } from "./GalleryModal";
import { GalleryImage, GalleryState } from "./GalleryPrimitives";
import { useGallery } from "./useGallery";

export function GaleriaFotos({ copy }: { copy: GalleryCopy }) {
  const [day, setDay] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ previous: false, next: false });
  const { data, failed, loading, loadingMore, loadMore, retry } = useGallery<PhotoGalleryData>(
    `/api/congresso/fotos${day ? `?day=${encodeURIComponent(day)}` : ""}`
  );
  const photos = data?.items ?? [];
  const selectedIndex = photos.findIndex((photo) => photo.id === selectedId);
  const selected = photos[selectedIndex];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function updateNavigation() {
      if (!track) return;
      const previous = track.scrollLeft > 2;
      const next = track.scrollLeft + track.clientWidth < track.scrollWidth - 2;
      setScrollState((current) => current.previous === previous && current.next === next ? current : { previous, next });
    }
    const frame = requestAnimationFrame(updateNavigation);
    const observer = new ResizeObserver(updateNavigation);
    observer.observe(track);
    track.addEventListener("scroll", updateNavigation, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("scroll", updateNavigation);
    };
  }, [photos.length]);

  function scrollPhotos(step: number) {
    const track = trackRef.current;
    const photo = track?.firstElementChild;
    if (!track || !(photo instanceof HTMLElement)) return;
    const distance = photo.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({ left: step * distance, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function navigate(step: number) {
    setSelectedId(photos[(selectedIndex + step + photos.length) % photos.length].id);
  }

  return <div className="gallery-group" id="galeria-fotos">
    <div className="gallery-group-heading">
      <h3>{copy.photos}</h3>
      {photos.length > 0 && <div className="gallery-scroll-controls">
        <button aria-controls="congress-photo-track" aria-label={copy.previous} disabled={!scrollState.previous} onClick={() => scrollPhotos(-1)} type="button">←</button>
        <button aria-controls="congress-photo-track" aria-label={copy.next} disabled={!scrollState.next} onClick={() => scrollPhotos(1)} type="button">→</button>
      </div>}
    </div>
    {Boolean(data?.days.length || day) && <div aria-label={copy.allDays} className="gallery-day-filters">
      <button aria-pressed={!day} onClick={() => setDay("")} type="button">{copy.allDays}</button>
      {(data?.days ?? [day]).map((item) => <button aria-pressed={item === day} key={item} onClick={() => setDay(item)} type="button">{item}</button>)}
    </div>}
    {photos.length ? <>
      <div aria-label={copy.photos} className="gallery-photo-track" id="congress-photo-track" ref={trackRef} role="region" tabIndex={0}>
        {photos.map((photo) => <button aria-label={`${copy.enlarge}: ${photo.title}`} className="gallery-photo" key={photo.id}
          onClick={() => setSelectedId(photo.id)} type="button">
          <GalleryImage alt={photo.alt || copy.photoAlt} fallback={copy.missingImage} key={photo.thumbnailUrl} src={photo.thumbnailUrl} />
          <span className="gallery-photo-caption">{photo.day || photo.title}<span aria-hidden="true">↗</span></span>
        </button>)}
      </div>
      {data?.nextPage && <button className="gallery-more" disabled={loadingMore} onClick={loadMore} type="button">{loadingMore ? copy.loading : copy.more}<span aria-hidden="true">↓</span></button>}
      {failed && <GalleryState copy={copy} failed kind="photo" onRetry={retry} />}
    </> : <GalleryState copy={copy} failed={failed} kind="photo" loading={loading} onRetry={retry} />}
    {selected && <GalleryModal copy={copy} onClose={() => setSelectedId(null)}
      onNext={photos.length > 1 ? () => navigate(1) : undefined} onPrevious={photos.length > 1 ? () => navigate(-1) : undefined}
      title={`${selected.title} — ${selectedIndex + 1} ${copy.counter} ${photos.length}`}>
      <GalleryImage alt={selected.alt || copy.photoAlt} fallback={copy.missingImage} key={selected.imageUrl} src={selected.imageUrl} />
    </GalleryModal>}
  </div>;
}
