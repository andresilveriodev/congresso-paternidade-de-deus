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
const firstBatch: CongressPhoto[] = descriptions.map((alt, index) => {
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

const secondBatchDescriptions = [
  "Participantes acompanham o Congresso no auditório.",
  "Participante acompanha a programação no auditório do Congresso.",
  "Público reunido no auditório durante a programação do Congresso.",
  "Apresentação artística no palco do Congresso.",
  "Equipe e participante conversam durante o Congresso.",
  "Participante diante do painel de boas-vindas do Congresso.",
  "Artista com representação da devoção ao Divino Pai Eterno durante a apresentação.",
  "Artista segura uma imagem do Divino Pai Eterno em cena.",
  "Participantes reunidos no palco do Congresso.",
  "Participantes conversam no espaço de convivência do Congresso.",
  "Conversa entre participantes durante o Congresso.",
  "Grupo de participantes diante do painel de boas-vindas.",
  "Apresentação teatral com projeção de uma pomba ao fundo.",
  "Participantes e expositores no espaço de convivência do Congresso.",
  "Participantes nas primeiras filas acompanham a programação no auditório.",
  "Participante preenche um formulário durante o Congresso."
];

const secondBatch: CongressPhoto[] = secondBatchDescriptions.map((alt, index) => {
  const number = String(index + 1).padStart(2, "0");
  const path = `/images/congresso/segunda-remessa/foto-${number}`;
  return {
    id: `congresso-segunda-remessa-${number}`,
    title: `Congresso Paternidade de Deus — ${String(index + firstBatch.length + 1).padStart(2, "0")}`,
    alt,
    thumbnailUrl: `${path}-miniatura.webp`,
    imageUrl: `${path}.webp`
  };
});

export const congressPhotos: CongressPhoto[] = [...secondBatch, ...firstBatch];
