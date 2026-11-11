import type { Locale } from "@/types/locale";

const pt = {
  title: "Galeria do", subtitle: "Congresso", intro: "Acompanhe os registros em fotos e vídeos do encontro.",
  photos: "Fotos do Congresso", videos: "Vídeos do Congresso", allDays: "Todos os dias",
  emptyPhotos: "As fotos do Congresso serão publicadas aqui em breve.",
  emptyVideos: "Os vídeos do Congresso serão publicados aqui em breve.",
  unavailable: "Não foi possível carregar os registros agora. Tente novamente em alguns instantes.",
  loading: "Carregando registros…", retry: "Tentar novamente", more: "Carregar mais", close: "Fechar",
  previous: "Foto anterior", next: "Próxima foto", enlarge: "Ampliar foto", watch: "Assistir ao vídeo",
  playlist: "Acompanhe a playlist oficial do Congresso", openPlaylist: "Reproduzir playlist",
  playlistHelp: "Escolha um dos vídeos para assistir aqui no site.", openYouTube: "Abrir playlist no YouTube",
  missingImage: "Imagem indisponível", photoAlt: "Registro do Congresso", counter: "de"
};

export type GalleryCopy = typeof pt;

export const galleryCopy: Record<Locale, GalleryCopy> = {
  pt,
  en: {
    title: "Congress", subtitle: "gallery", intro: "Follow the meeting through photos and videos.",
    photos: "Congress photos", videos: "Congress videos", allDays: "All days",
    emptyPhotos: "Photos from the Congress will be published here soon.", emptyVideos: "Videos from the Congress will be published here soon.",
    unavailable: "The gallery could not be loaded. Please try again shortly.",
    loading: "Loading…", retry: "Try again", more: "Load more", close: "Close", previous: "Previous photo", next: "Next photo",
    enlarge: "Enlarge photo", watch: "Watch video", playlist: "Follow the official Congress playlist", openPlaylist: "Play playlist",
    playlistHelp: "Choose a video to watch here on the site.", openYouTube: "Open playlist on YouTube",
    missingImage: "Image unavailable", photoAlt: "Congress photo", counter: "of"
  },
  es: {
    title: "Galería del", subtitle: "Congreso", intro: "Sigue el encuentro a través de fotos y vídeos.",
    photos: "Fotos del Congreso", videos: "Vídeos del Congreso", allDays: "Todos los días",
    emptyPhotos: "Las fotos del Congreso se publicarán aquí próximamente.", emptyVideos: "Los vídeos del Congreso se publicarán aquí próximamente.",
    unavailable: "No se pudo cargar la galería. Inténtalo de nuevo en unos instantes.",
    loading: "Cargando…", retry: "Intentar de nuevo", more: "Cargar más", close: "Cerrar", previous: "Foto anterior", next: "Foto siguiente",
    enlarge: "Ampliar foto", watch: "Ver vídeo", playlist: "Sigue la lista oficial del Congreso", openPlaylist: "Reproducir lista",
    playlistHelp: "Elige un vídeo para verlo aquí en el sitio.", openYouTube: "Abrir lista en YouTube",
    missingImage: "Imagen no disponible", photoAlt: "Foto del Congreso", counter: "de"
  },
  it: {
    title: "Galleria del", subtitle: "Congresso", intro: "Segui l’incontro attraverso foto e video.",
    photos: "Foto del Congresso", videos: "Video del Congresso", allDays: "Tutti i giorni",
    emptyPhotos: "Le foto del Congresso saranno pubblicate qui a breve.", emptyVideos: "I video del Congresso saranno pubblicati qui a breve.",
    unavailable: "Impossibile caricare la galleria. Riprova tra qualche istante.",
    loading: "Caricamento…", retry: "Riprova", more: "Carica altro", close: "Chiudi", previous: "Foto precedente", next: "Foto successiva",
    enlarge: "Ingrandisci foto", watch: "Guarda il video", playlist: "Segui la playlist ufficiale del Congresso", openPlaylist: "Riproduci playlist",
    playlistHelp: "Scegli un video da guardare qui sul sito.", openYouTube: "Apri playlist su YouTube",
    missingImage: "Immagine non disponibile", photoAlt: "Foto del Congresso", counter: "di"
  }
};
