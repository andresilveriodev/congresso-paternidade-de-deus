import type { CongressPhoto } from "@/types/congresso";

const descriptions = [
  "Religioso com microfone na tribuna do Congresso Paternidade de Deus.",
  "Sacerdote faz uma leitura na tribuna do Congresso.",
  "Participantes reunidos no palco durante a abertura do Congresso.",
  "Apresentação teatral com dois artistas e uma imagem do Divino Pai Eterno.",
  "Artista segura a imagem do Divino Pai Eterno durante a apresentação teatral.",
  "Participantes acompanham o Congresso no auditório.",
  "Sacerdote fala ao microfone na tribuna do Congresso.",
  "Participantes na primeira fila acompanham a programação do Congresso.",
  "Vela acesa, flores e representação da devoção ao Divino Pai Eterno.",
  "Vista do palco e do auditório durante uma fala no Congresso.",
  "Religiosos e participantes acompanham a programação no auditório.",
  "Dois artistas em cena com a imagem do Divino Pai Eterno.",
  "Sacerdote faz uma leitura ao microfone na tribuna do Congresso."
];

// Supplied photos, in the same numerical order as the original files.
export const congressPhotos: CongressPhoto[] = descriptions.map((alt, index) => {
  const number = String(index + 1).padStart(2, "0");
  const path = `/images/congresso/primeira-remessa/foto-${number}`;
  return {
    id: `congresso-primeira-remessa-${number}`,
    title: `Congresso Paternidade de Deus — ${number}`,
    alt,
    thumbnailUrl: `${path}-miniatura.webp`,
    imageUrl: `${path}.webp`
  };
});
