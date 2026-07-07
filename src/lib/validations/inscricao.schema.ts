import { z } from "zod";

const required = (label: string) =>
  z.string({ error: `${label} e obrigatorio.` }).trim().min(1, `${label} e obrigatorio.`);

const isAffirmative = (value: string) => {
  const normalized = value.trim().toLowerCase();
  return normalized.startsWith("s") || normalized === "yes";
};

const optionalStringArray = z.preprocess((value) => {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}, z.array(z.string()).default([]));

const acceptedTerms = z
  .preprocess((value) => value === true || value === "true" || value === "on" || value === "aceito", z.boolean())
  .refine((value) => value, "Aceite os Termos de Uso para continuar.");

export const inscricaoSchema = z
  .object({
    locale: z.enum(["pt", "en", "it"]).default("pt"),
    nome: required("Nome completo").max(160),
    nomeCredencial: required("Nome para credencial").max(80),
    dataNascimento: required("Data de nascimento"),
    cpf: z.string().trim().optional().default(""),
    passaporte: z.string().trim().optional().default(""),
    nacionalidade: required("Nacionalidade").max(80),
    sexo: required("Sexo"),
    estadoCivil: required("Estado civil"),
    telefoneWhatsapp: required("Telefone/WhatsApp").max(40),
    emailContato: required("E-mail").email("Coloque seu e-mail corretamente."),
    endereco: required("Endereco").max(240),
    cidade: required("Cidade").max(120),
    estado: required("Estado").max(80),
    paisContato: required("Pais").max(80),
    cep: required("CEP").max(30),
    cargoFuncao: required("Cargo/Funcao"),
    areaAtuacao: required("Area de atuacao"),
    areaOutraQual: z.string().trim().optional().default(""),
    modalidadeParticipacao: required("Modalidade de participacao"),
    apresentaraTrabalho: required("Apresentacao de trabalho academico"),
    tituloTrabalho: z.string().trim().optional().default(""),
    areaTematica: z.string().trim().optional().default(""),
    necessidadeEspecifica: required("Necessidade especifica"),
    necessidadeQual: z.string().trim().optional().default(""),
    necessidadesEspeciais: optionalStringArray,
    hospedagemNecessita: required("Hospedagem"),
    chegadaPrevista: z.string().trim().optional().default(""),
    saidaPrevista: z.string().trim().optional().default(""),
    participaraEventosCulturais: required("Eventos culturais"),
    idiomaPreferencial: required("Idioma preferencial"),
    certificacaoDeseja: required("Certificacao"),
    nomeCertificado: z.string().trim().optional().default(""),
    autorizacaoImagem: required("Autorizacao de imagem"),
    cidadeCompromisso: required("Cidade"),
    dataCompromisso: required("Data"),
    assinaturaCompromisso: required("Assinatura"),
    aceiteTermos: acceptedTerms
  })
  .superRefine((data, ctx) => {
    const isForeign = data.nacionalidade && data.nacionalidade.toLowerCase() !== "brasileira";

    if (!data.cpf && !data.passaporte) {
      ctx.addIssue({
        code: "custom",
        path: [isForeign ? "passaporte" : "cpf"],
        message: isForeign ? "Informe o passaporte." : "Informe o CPF."
      });
    }

    if (isAffirmative(data.necessidadeEspecifica) && !data.necessidadeQual) {
      ctx.addIssue({ code: "custom", path: ["necessidadeQual"], message: "Descreva a necessidade especifica." });
    }

    if (isAffirmative(data.apresentaraTrabalho)) {
      if (!data.tituloTrabalho) {
        ctx.addIssue({ code: "custom", path: ["tituloTrabalho"], message: "Informe o titulo do trabalho." });
      }

      if (!data.areaTematica) {
        ctx.addIssue({ code: "custom", path: ["areaTematica"], message: "Informe a area tematica." });
      }
    }

    if (isAffirmative(data.certificacaoDeseja) && !data.nomeCertificado) {
      ctx.addIssue({ code: "custom", path: ["nomeCertificado"], message: "Informe o nome para o certificado." });
    }
  });

export function zodIssuesToFieldErrors(error: z.ZodError) {
  return Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message])
  );
}
