export type CongressPhoto = {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  thumbnailUrl: string;
  day?: string;
  modifiedTime?: string;
};

export type CongressVideo = {
  id: string;
  title: string;
  thumbnailUrl?: string;
  position: number;
};

export type GalleryStatus = "ready" | "unconfigured" | "unavailable";

export type PhotoGalleryData = {
  status: GalleryStatus;
  items: CongressPhoto[];
  days: string[];
  nextPage?: number;
  limited?: boolean;
};

export type VideoGalleryData = {
  status: GalleryStatus;
  mode: "cards" | "playlist";
  items: CongressVideo[];
  playlistId?: string;
  nextPage?: number;
  limited?: boolean;
};
