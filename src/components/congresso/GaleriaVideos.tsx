"use client";

import { useState } from "react";
import type { GalleryCopy } from "@/content/gallery";
import type { CongressVideo, VideoGalleryData } from "@/types/congresso";
import { GalleryModal } from "./GalleryModal";
import { GalleryIcon, GalleryImage, GalleryState } from "./GalleryPrimitives";
import { useGallery } from "./useGallery";

export function GaleriaVideos({ copy }: { copy: GalleryCopy }) {
  const { data, failed, loading, loadingMore, loadMore, retry } = useGallery<VideoGalleryData>("/api/congresso/videos", 60_000, false);
  const [selected, setSelected] = useState<CongressVideo | null>(null);
  const videos = data?.items ?? [];
  const playlistId = data?.mode === "playlist" ? data.playlistId : undefined;
  const playlistUrl = playlistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}&rel=0&playsinline=1` : null;
  const playerUrl = selected && /^[\w-]{11}$/.test(selected.id)
      ? `https://www.youtube-nocookie.com/embed/${selected.id}?rel=0&autoplay=1` : null;

  return <div className="gallery-group" id="galeria-videos">
    <div className="gallery-group-heading"><h3>{copy.videos}</h3></div>
    {playlistUrl && playlistId ? <div className="gallery-playlist">
      {videos.length ? <div className="gallery-playlist-grid">{videos.map((video) => <article key={video.id}>
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&playsinline=1`} title={video.title} />
        <h4 className="gallery-playlist-title">{video.title}</h4>
      </article>)}</div> : <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={playlistUrl} title={copy.playlist} />}
      <div className="gallery-playlist-footer">
        <p>{copy.playlistHelp}</p>
        <a href={`https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`} rel="noopener noreferrer" target="_blank">{copy.openYouTube} <span aria-hidden="true">↗</span></a>
      </div>
      {failed && <GalleryState copy={copy} failed kind="video" onRetry={retry} />}
    </div> : videos.length ? <>
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
    </> : <GalleryState copy={copy} failed={failed} kind="video" loading={loading} onRetry={retry} />}
    {selected && playerUrl && <GalleryModal copy={copy} onClose={() => setSelected(null)} title={selected.title} video>
      <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen referrerPolicy="strict-origin-when-cross-origin" src={playerUrl} title={selected.title} />
    </GalleryModal>}
  </div>;
}
