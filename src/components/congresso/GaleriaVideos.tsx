"use client";

import { useState } from "react";
import type { GalleryCopy } from "@/content/gallery";
import type { CongressVideo, VideoGalleryData } from "@/types/congresso";
import { GalleryModal } from "./GalleryModal";
import { GalleryIcon, GalleryImage, GalleryState } from "./GalleryPrimitives";
import { useGallery } from "./useGallery";

export function GaleriaVideos({ copy }: { copy: GalleryCopy }) {
  const { data, failed, loading, loadingMore, loadMore, retry } = useGallery<VideoGalleryData>("/api/congresso/videos");
  const [selected, setSelected] = useState<CongressVideo | "playlist" | null>(null);
  const videos = data?.items ?? [];
  const playerUrl = selected === "playlist" && data?.playlistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(data.playlistId)}&rel=0`
    : selected && typeof selected !== "string" && /^[\w-]{11}$/.test(selected.id)
      ? `https://www.youtube-nocookie.com/embed/${selected.id}?rel=0&autoplay=1` : null;
  const playerTitle = selected && typeof selected !== "string" ? selected.title : copy.playlist;

  return <div className="gallery-group" id="galeria-videos">
    <div className="gallery-group-heading"><h3>{copy.videos}</h3></div>
    {videos.length ? <>
      <div className="gallery-video-grid">{videos.map((video) => <button aria-label={`${copy.watch}: ${video.title}`}
        className="gallery-video" key={video.id} onClick={() => setSelected(video)} type="button">
        <span className="gallery-video-thumbnail">
          {video.thumbnailUrl ? <GalleryImage alt="" fallback={copy.missingImage} src={video.thumbnailUrl} /> : <GalleryIcon kind="video" />}
          <span aria-hidden="true" className="gallery-play">▶</span>
        </span>
        <span className="gallery-video-title">{video.title}</span>
      </button>)}</div>
      {data?.nextPage && <button className="gallery-more" disabled={loadingMore} onClick={loadMore} type="button">{loadingMore ? copy.loading : copy.more}<span aria-hidden="true">↓</span></button>}
      {failed && <GalleryState copy={copy} failed kind="video" onRetry={retry} />}
    </> : data?.mode === "playlist" && data.playlistId ? <button className="gallery-playlist" onClick={() => setSelected("playlist")} type="button">
      <span aria-hidden="true" className="gallery-play">▶</span><strong>{copy.playlist}</strong><span>{copy.openPlaylist} ↗</span>
    </button> : <GalleryState copy={copy} failed={failed} kind="video" loading={loading} onRetry={retry} />}
    {selected && playerUrl && <GalleryModal copy={copy} onClose={() => setSelected(null)} title={playerTitle} video>
      <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen referrerPolicy="strict-origin-when-cross-origin" src={playerUrl} title={playerTitle} />
    </GalleryModal>}
  </div>;
}
