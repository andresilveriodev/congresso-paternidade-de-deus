"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ArrowIcon } from "@/components/ArrowIcon";
import { SiteMenu } from "@/components/SiteMenu";
import { getInitialLocale, Locale, locales, saveLocale } from "@/lib/i18n";
import { images } from "@/lib/site-data";

type RegistrationForm = {
  nome: string;
  nomeCredencial: string;
  dataNascimento: string;
  cpf: string;
  passaporte: string;
  nacionalidade: string;
  sexo: string;
  estadoCivil: string;
  telefoneWhatsapp: string;
  emailContato: string;
  endereco: string;
  cidade: string;
  estado: string;
  paisContato: string;
  cep: string;
  cargoFuncao: string;
  areaAtuacao: string;
  areaOutraQual: string;
  modalidadeParticipacao: string;
  tituloTrabalho: string;
  areaTematica: string;
  necessidadeEspecifica: string;
  necessidadeQual: string;
  necessidadesEspeciais: string[];
  hospedagemNecessita: string;
  chegadaPrevista: string;
  saidaPrevista: string;
  participaraEventosCulturais: string;
  idiomaPreferencial: string;
  certificacaoDeseja: string;
  nomeCertificado: string;
  autorizacaoImagem: string;
  cidadeCompromisso: string;
  dataCompromisso: string;
  assinaturaCompromisso: string;
};

type UploadItem = {
  id: string;
  file: File;
  progress: number;
};

const cargoOptions = [
  "Bispo",
  "Padre",
  "Diácono",
  "Religioso(a)",
  "Seminarista",
  "Leigo(a)",
  "Professor(a)",
  "Pesquisador(a)",
  "Estudante",
  "Outro"
];

const areaAtuacaoOptions = [
  "Teologia Sistemática",
  "Teologia Bíblica",
  "Teologia Moral",
  "Espiritualidade",
  "Liturgia",
  "Catequese",
  "Pastoral",
  "Direito Canônico",
  "Filosofia",
  "Ciências da Religião"
];

const modalidadeParticipacaoOptions = [
  "Participante",
  "Participante com certificado",
  "Apresentação de Comunicação Científica",
  "Conferencista convidado"
];

const specialNeedsOptions = [
  "Acessibilidade física",
  "Intérprete de Libras",
  "Tradução simultânea",
  "Alimentação especial",
  "Outro"
];

const preferredLanguageOptions = ["Português", "Espanhol", "Inglês", "Italiano", "Francês"];

const sexoOptions = ["Masculino", "Feminino"];
const estadoCivilOptions = ["Solteiro(a)", "Casado(a)", "Religioso(a)", "Sacerdote", "Bispo", "Outro"];

const languageLabels: Record<Locale, string> = {
  en: "Inglês",
  pt: "Português",
  it: "Italiano"
};

export function RegistrationPage() {
  const [locale, setLocale] = useState<Locale>("pt");
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<string>("");
  const t = locales[locale];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationForm>();

  useEffect(() => {
    const id = window.setTimeout(() => setLocale(getInitialLocale()), 0);
    return () => window.clearTimeout(id);
  }, []);

  const updateLocale = (next: Locale) => {
    setLocale(next);
    saveLocale(next);
  };

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const nextFiles = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      progress: 0
    }));
    setUploads((current) => [...current, ...nextFiles]);

    nextFiles.forEach((item) => {
      const timer = window.setInterval(() => {
        setUploads((current) =>
          current.map((upload) =>
            upload.id === item.id ? { ...upload, progress: Math.min(upload.progress + 18, 100) } : upload
          )
        );
      }, 140);
      window.setTimeout(() => window.clearInterval(timer), 900);
    });
  };

  const onSubmit = async (values: RegistrationForm) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value) {
        formData.append(key, value);
      }
    });
    uploads.forEach((upload) => formData.append("arquivos", upload.file));

    const response = await fetch("/api/enviar-formulario", {
      method: "POST",
      body: formData
    });
    const result = await response.json();
    setStatus(result.message ?? (response.ok ? "Inscrição enviada." : "Erro ao enviar."));
  };

  const headerLabels = {
    ...t.labels,
    registration: locale === "pt" ? "Inscrição" : t.labels.registration,
    schedule: locale === "pt" ? "Programação" : t.labels.schedule,
    speakers: locale === "pt" ? "Conferencistas" : t.labels.speakers,
    papers: locale === "pt" ? "Trabalho científico" : t.labels.papers,
    location: locale === "pt" ? "Local" : t.labels.location,
    language: locale === "pt" ? "Idioma" : t.labels.language
  };

  return (
    <>
      <header className="site-header registration-header">
        <Link className="brand" href="/">
          <img alt="Paternidade de Deus" src={images.markRegistration} />
        </Link>
        <SiteMenu
          anchorPrefix="/"
          labels={headerLabels}
          locale={locale}
          onLocaleChange={updateLocale}
          showRegistrationButton={false}
        />
        <div className="registration-language" aria-label={headerLabels.language}>
          {(["en", "pt", "it"] as Locale[]).map((item) => (
            <button
              aria-pressed={locale === item}
              key={item}
              onClick={() => updateLocale(item)}
              type="button"
            >
              {languageLabels[item]}
            </button>
          ))}
        </div>
      </header>

      <main className={`registration-page ${dragging ? "is-dragging" : ""}`}>
        <section className="registration-hero" aria-labelledby="registration-title">
          <div className="registration-hero-inner">
            <h1 id="registration-title">
              <span>I Congresso internacional de teologia</span>
              <span>Sobre a Paternidade de Deus</span>
            </h1>
            <p className="registration-theme">“Entre Dogma e Devoção”</p>
            <blockquote>
              “Recebestes um Espírito de filhos adotivos, pelo qual clamamos: Abbá, Pai!”{" "}
              <strong>(Gl 4,6)</strong>
            </blockquote>
          </div>
        </section>

        <form className="registration-form" id="formulario" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="personal-fieldset">
            <legend>1. Dados pessoais</legend>
            <PlainInput className="span-full" error={errors.nome?.message} label="Nome Completo:" {...register("nome", { required: "Obrigatório" })} />
            <PlainInput className="span-full" error={errors.nomeCredencial?.message} label="Nome para credencial:" {...register("nomeCredencial", { required: "Obrigatório" })} />
            <PlainInput error={errors.dataNascimento?.message} label="Data de nascimento:" {...register("dataNascimento", { required: "Obrigatório" })} />
            <PlainInput error={errors.cpf?.message} label="CPF:" {...register("cpf", { required: "Obrigatório" })} />
            <PlainInput label="Passaporte (estrangeiros):" {...register("passaporte")} />
            <PlainInput error={errors.nacionalidade?.message} label="Nacionalidade:" {...register("nacionalidade", { required: "Obrigatório" })} />

            <RadioGroup
              label="Sexo:"
              name="sexo"
              options={sexoOptions}
              register={register("sexo", { required: "Obrigatório" })}
              error={errors.sexo?.message}
            />
            <RadioGroup
              label="Estado Civil:"
              name="estadoCivil"
              options={estadoCivilOptions}
              register={register("estadoCivil", { required: "Obrigatório" })}
              error={errors.estadoCivil?.message}
            />
          </fieldset>

          <fieldset className="contact-fieldset">
            <legend>2. Contatos</legend>
            <PlainInput error={errors.telefoneWhatsapp?.message} label="Telefone/WhatsApp:" {...register("telefoneWhatsapp", { required: "Obrigatório" })} />
            <PlainInput error={errors.emailContato?.message} label="E-mail:" {...register("emailContato", { required: "Obrigatório" })} />
            <PlainInput error={errors.endereco?.message} label="Endereço:" {...register("endereco", { required: "Obrigatório" })} />
            <PlainInput error={errors.cidade?.message} label="Cidade:" {...register("cidade", { required: "Obrigatório" })} />
            <PlainInput error={errors.estado?.message} label="Estado:" {...register("estado", { required: "Obrigatório" })} />
            <PlainInput error={errors.paisContato?.message} label="País:" {...register("paisContato", { required: "Obrigatório" })} />
            <PlainInput className="span-left" error={errors.cep?.message} label="CEP:" {...register("cep", { required: "Obrigatório" })} />
          </fieldset>

          <fieldset className="vinculo-fieldset">
            <legend>3. Vínculo eclesial / acadêmico</legend>
            <RadioGroup
              label="Cargo/Função:"
              name="cargoFuncao"
              options={cargoOptions}
              register={register("cargoFuncao", { required: "Obrigatório" })}
              error={errors.cargoFuncao?.message}
            />
            <RadioGroup
              label="Área de atuação:"
              name="areaAtuacao"
              options={areaAtuacaoOptions}
              register={register("areaAtuacao", { required: "Obrigatório" })}
              error={errors.areaAtuacao?.message}
            />
            <InlineLineField
              label="Outra Qual?"
              error={errors.areaOutraQual?.message}
              register={register("areaOutraQual")}
            />
          </fieldset>

          <fieldset className="participation-fieldset">
            <legend>4. Modalidade de participação</legend>
            <RadioGroup
              label=""
              name="modalidadeParticipacao"
              options={modalidadeParticipacaoOptions}
              register={register("modalidadeParticipacao", { required: "Obrigatório" })}
              error={errors.modalidadeParticipacao?.message}
            />
          </fieldset>

          <fieldset className="academic-fieldset">
            <legend>5. Inscrição de trabalhos acadêmicos</legend>
            <InlineLineField
              label="Título do trabalho:"
              error={errors.tituloTrabalho?.message}
              register={register("tituloTrabalho", { required: "Obrigatório" })}
            />
            <InlineLineField
              label="Área temática:"
              error={errors.areaTematica?.message}
              register={register("areaTematica", { required: "Obrigatório" })}
            />
            <label
              className="dropzone"
              onDragEnter={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                addFiles(event.dataTransfer.files);
              }}
            >
              <input
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                multiple
                onChange={(event) => addFiles(event.target.files)}
                type="file"
              />
              <span>Anexar arquivo PDF</span>
            </label>
            <div className="upload-list">
              {uploads.map((upload) => (
                <div className="upload-item" key={upload.id}>
                  <div>
                    <span>{upload.file.name}</span>
                    <button
                      aria-label={`Remover ${upload.file.name}`}
                      onClick={() => setUploads((current) => current.filter((item) => item.id !== upload.id))}
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                  <progress max={100} value={upload.progress} />
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="special-needs-fieldset">
            <legend>6. Necessidades especiais</legend>
            <p className="field-question">Possui alguma necessidade específica?</p>
            <div className="question-inline-row">
              <RadioGroup
                label=""
                name="necessidadeEspecifica"
                options={["Sim", "Não"]}
                register={register("necessidadeEspecifica", { required: "Obrigatório" })}
                error={errors.necessidadeEspecifica?.message}
              />
              <InlineLineField
                label="Qual?"
                error={errors.necessidadeQual?.message}
                register={register("necessidadeQual")}
              />
            </div>
            <p className="field-subtitle">Necessita de:</p>
            <OptionCloud options={specialNeedsOptions} register={register("necessidadesEspeciais")} />
          </fieldset>

          <fieldset className="hospedagem-fieldset">
            <legend>7. Hospedagem e Logística</legend>
            <p className="field-question">Necessita de informações sobre hospedagem?</p>
            <RadioGroup
              label=""
              name="hospedagemNecessita"
              options={["Sim", "Não"]}
              register={register("hospedagemNecessita", { required: "Obrigatório" })}
              error={errors.hospedagemNecessita?.message}
            />
            <div className="pair-line-row">
              <InlineLineField
                label="Data prevista de chegada:"
                error={errors.chegadaPrevista?.message}
                register={register("chegadaPrevista")}
              />
              <InlineLineField
                label="Data prevista de saída:"
                error={errors.saidaPrevista?.message}
                register={register("saidaPrevista")}
              />
            </div>
            <p className="field-question emphasis">Participará dos eventos culturais e visitas guiadas?</p>
            <RadioGroup
              label=""
              name="participaraEventosCulturais"
              options={["Sim", "Não"]}
              register={register("participaraEventosCulturais", { required: "Obrigatório" })}
              error={errors.participaraEventosCulturais?.message}
            />
          </fieldset>

          <fieldset className="language-fieldset">
            <legend>8. Idioma preferencial</legend>
            <RadioGroup
              label=""
              name="idiomaPreferencial"
              options={preferredLanguageOptions}
              register={register("idiomaPreferencial", { required: "Obrigatório" })}
              error={errors.idiomaPreferencial?.message}
            />
          </fieldset>

          <fieldset className="certification-fieldset">
            <legend>9. Certificação</legend>
            <p className="field-question">Deseja certificado?</p>
            <RadioGroup
              label=""
              name="certificacaoDeseja"
              options={["Sim", "Não"]}
              register={register("certificacaoDeseja", { required: "Obrigatório" })}
              error={errors.certificacaoDeseja?.message}
            />
            <InlineLineField
              label="Nome exatamente como deverá constar no certificado:"
              error={errors.nomeCertificado?.message}
              register={register("nomeCertificado")}
            />
          </fieldset>

          <fieldset className="image-fieldset">
            <legend>10. Autorização de uso de imagem</legend>
            <p className="field-copy">
              Autorizo a utilização de minha imagem, voz e participação em fotografias, gravações e transmissões realizadas durante o I
              Congresso Internacional de Teologia sobre a Paternidade de Deus, para fins institucionais, acadêmicos, evangelizadores e
              promocionais, sem ônus para a organização.
            </p>
            <RadioGroup
              label=""
              name="autorizacaoImagem"
              options={["Sim", "Não"]}
              register={register("autorizacaoImagem", { required: "Obrigatório" })}
              error={errors.autorizacaoImagem?.message}
            />
          </fieldset>

          <fieldset className="commitment-fieldset">
            <legend>11. Termo de compromisso</legend>
            <p className="field-copy">
              Declaro que as informações prestadas são verdadeiras e que estou ciente das normas de participação do Congresso.
            </p>
            <div className="pair-line-row">
              <InlineLineField label="Cidade:" error={errors.cidadeCompromisso?.message} register={register("cidadeCompromisso")} />
              <InlineLineField label="Data:" error={errors.dataCompromisso?.message} register={register("dataCompromisso")} />
            </div>
            <InlineLineField
              label="Assinatura:"
              error={errors.assinaturaCompromisso?.message}
              className="signature-line"
              register={register("assinaturaCompromisso")}
            />
          </fieldset>

          <button className="cta-button form-submit" disabled={isSubmitting} type="submit">
            <ArrowIcon />
            <span>{isSubmitting ? "Enviando..." : locale === "pt" ? "Fazer inscrição" : t.labels.registerNow}</span>
          </button>
          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </main>
    </>
  );
}

type PlainInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function PlainInput({ className, label, error, ...props }: PlainInputProps) {
  return (
    <label className={`plain-field${className ? ` ${className}` : ""}`}>
      <input placeholder={label} {...props} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}

type RadioGroupProps = {
  label: string;
  name: string;
  options: string[];
  register: UseFormRegisterReturn;
  error?: string;
};

function RadioGroup({ label, name, options, register, error }: RadioGroupProps) {
  return (
    <div className={`registration-radio-group${label ? "" : " no-title"}`} role="radiogroup" aria-labelledby={label ? `${name}-label` : undefined}>
      {label ? (
        <span id={`${name}-label`} className="radio-group-title">
          {label}
        </span>
      ) : null}
      <div className="radio-options">
        {options.map((option) => (
          <label key={option}>
            <span>{option}</span>
            <input type="radio" value={option} {...register} />
          </label>
        ))}
      </div>
      {error ? <small>{error}</small> : null}
    </div>
  );
}

type InlineLineFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
};

function InlineLineField({ label, register, error, className }: InlineLineFieldProps) {
  return (
    <label className={`inline-line-field${className ? ` ${className}` : ""}`}>
      <span>{label}</span>
      <input placeholder=" " {...register} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}

type OptionCloudProps = {
  options: string[];
  register: UseFormRegisterReturn;
};

function OptionCloud({ options, register }: OptionCloudProps) {
  return (
    <div className="option-cloud">
      <div className="radio-options option-cloud-grid">
        {options.map((option) => (
          <label key={option}>
            <span>{option}</span>
            <input type="checkbox" value={option} {...register} />
          </label>
        ))}
      </div>
    </div>
  );
}
