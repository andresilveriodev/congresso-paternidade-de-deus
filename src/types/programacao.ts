export type ProgramacaoItem = {
  time: string;
  title: string;
};

export type ProgramacaoDay = {
  day: string;
  items: ProgramacaoItem[];
};

