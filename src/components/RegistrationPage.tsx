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

const registrationCopy = {
  pt: {
    languageLabels: { en: "Inglês", pt: "Português", it: "Italiano" },
    required: "Obrigatório",
    submitting: "Enviando...",
    submit: "Fazer inscrição",
    remove: "Remover",
    fileButton: "Anexar arquivo PDF",
    hero: [
      "I Congresso internacional de teologia",
      "Sobre a Paternidade de Deus",
      "“Entre Dogma e Devoção”",
      "“Recebestes um Espírito de filhos adotivos, pelo qual clamamos: Abbá, Pai!”",
      "(Gl 4,6)"
    ],
    fields: {
      personal: "1. Dados pessoais",
      fullName: "Nome Completo:",
      badgeName: "Nome para credencial:",
      birthDate: "Data de nascimento:",
      cpf: "CPF:",
      passport: "Passaporte (estrangeiros):",
      nationality: "Nacionalidade:",
      gender: "Sexo:",
      marital: "Estado Civil:",
      contact: "2. Contatos",
      phone: "Telefone/WhatsApp:",
      email: "E-mail:",
      address: "Endereço:",
      city: "Cidade:",
      state: "Estado:",
      country: "País:",
      postal: "CEP:",
      affiliation: "3. Vínculo eclesial / acadêmico",
      role: "Cargo/Função:",
      field: "Área de atuação:",
      other: "Outra Qual?",
      participation: "4. Modalidade de participação",
      academic: "5. Inscrição de trabalhos acadêmicos",
      paperTitle: "Título do trabalho:",
      thematicArea: "Área temática:",
      needs: "6. Necessidades especiais",
      hasNeeds: "Possui alguma necessidade específica?",
      which: "Qual?",
      requires: "Necessita de:",
      lodging: "7. Hospedagem e Logística",
      lodgingQuestion: "Necessita de informações sobre hospedagem?",
      arrival: "Data prevista de chegada:",
      departure: "Data prevista de saída:",
      cultural: "Participará dos eventos culturais e visitas guiadas?",
      language: "8. Idioma preferencial",
      certification: "9. Certificação",
      wantsCertificate: "Deseja certificado?",
      certificateName: "Nome exatamente como deverá constar no certificado:",
      image: "10. Autorização de uso de imagem",
      imageText:
        "Autorizo a utilização de minha imagem, voz e participação em fotografias, gravações e transmissões realizadas durante o I Congresso Internacional de Teologia sobre a Paternidade de Deus, para fins institucionais, acadêmicos, evangelizadores e promocionais, sem ônus para a organização.",
      commitment: "11. Termo de compromisso",
      commitmentText: "Declaro que as informações prestadas são verdadeiras e que estou ciente das normas de participação do Congresso.",
      commitmentCity: "Cidade:",
      commitmentDate: "Data:",
      signature: "Assinatura:"
    },
    yesNo: ["Sim", "Não"],
    sexoOptions,
    estadoCivilOptions,
    cargoOptions,
    areaAtuacaoOptions,
    modalidadeParticipacaoOptions,
    specialNeedsOptions,
    preferredLanguageOptions
  },
  en: {
    languageLabels: { en: "English", pt: "Portuguese", it: "Italian" },
    required: "Required",
    submitting: "Sending...",
    submit: "Register",
    remove: "Remove",
    fileButton: "Attach PDF file",
    hero: [
      "1st International Congress on Theology",
      "On the Fatherhood of God",
      "“Between Dogma and Devotion”",
      "“You received a Spirit of adoption, through whom we cry out: Abba, Father!”",
      "(Gal 4:6)"
    ],
    fields: {
      personal: "1. Personal Details",
      fullName: "Full Name:",
      badgeName: "Name for badge:",
      birthDate: "Date of Birth:",
      cpf: "Tax ID (CPF):",
      passport: "Passport (foreigners):",
      nationality: "Nationality:",
      gender: "Gender:",
      marital: "Marital Status:",
      contact: "2. Contact Information",
      phone: "Phone/WhatsApp:",
      email: "E-mail:",
      address: "Address:",
      city: "City:",
      state: "State:",
      country: "Country:",
      postal: "Postal Code:",
      affiliation: "3. Ecclesiastical / Academic Affiliation",
      role: "Role/Position:",
      field: "Field of Study/Work:",
      other: "Other (Specify):",
      participation: "4. Participation Category",
      academic: "5. Academic Paper Submission",
      paperTitle: "Paper Title:",
      thematicArea: "Thematic Area:",
      needs: "6. Special Needs",
      hasNeeds: "Do you have any specific needs?",
      which: "Specify:",
      requires: "Requirements:",
      lodging: "7. Accommodation and Logistics",
      lodgingQuestion: "Do you need information regarding accommodation?",
      arrival: "Expected arrival date:",
      departure: "Expected departure date:",
      cultural: "Will you participate in cultural events and guided tours?",
      language: "8. Preferred language",
      certification: "9. Certification",
      wantsCertificate: "Do you want a certificate?",
      certificateName: "Name exactly as it should appear on the certificate:",
      image: "10. Image use authorization",
      imageText:
        "I authorize the use of my image, voice, and participation in photographs, recordings, and broadcasts made during the 1st International Congress on the Fatherhood of God for institutional, academic, evangelistic, and promotional purposes, at no cost to the organization.",
      commitment: "11. Statement of commitment",
      commitmentText: "I declare that the information provided is true and that I am aware of the Congress participation rules.",
      commitmentCity: "City:",
      commitmentDate: "Date:",
      signature: "Signature:"
    },
    yesNo: ["Yes", "No"],
    sexoOptions: ["Male", "Female"],
    estadoCivilOptions: ["Single", "Married", "Religious", "Priest", "Bishop", "Other"],
    cargoOptions: ["Bishop", "Priest", "Deacon", "Religious", "Seminarian", "Layperson", "Professor", "Researcher", "Student", "Other"],
    areaAtuacaoOptions: ["Systematic Theology", "Biblical Theology", "Moral Theology", "Spirituality", "Liturgy", "Catechesis", "Pastoral Ministry", "Canon Law", "Philosophy", "Religious Studies"],
    modalidadeParticipacaoOptions: ["Participant", "Participant with certificate", "Academic Paper Presentation", "Invited Speaker"],
    specialNeedsOptions: ["Physical accessibility", "Sign Language Interpreter (Libras)", "Simultaneous translation", "Special dietary needs", "Other"],
    preferredLanguageOptions: ["Portuguese", "Spanish", "English", "Italian", "French"]
  },
  it: {
    languageLabels: { en: "Inglese", pt: "Portoghese", it: "Italiano" },
    required: "Obbligatorio",
    submitting: "Invio...",
    submit: "Iscrizione",
    remove: "Rimuovere",
    fileButton: "Allega file PDF",
    hero: [
      "1° Congresso Internazionale di Teologia",
      "Sulla paternità di Dio",
      "“Tra dogma e devozione”",
      "“Infatti avete ricevuto uno spirito di adozione, mediante il quale gridiamo: Abbà, Padre!”",
      "(Gal 4,6)"
    ],
    fields: {
      personal: "1. Dati personali",
      fullName: "Nome e cognome:",
      badgeName: "Nome per i documenti:",
      birthDate: "Data di nascita:",
      cpf: "Codice fiscale brasiliano (CPF):",
      passport: "Passaporto (per stranieri):",
      nationality: "Nazionalità:",
      gender: "Sesso:",
      marital: "Stato civile:",
      contact: "2. Informazioni di contatto",
      phone: "Telefono/WhatsApp:",
      email: "Email:",
      address: "Indirizzo:",
      city: "Città:",
      state: "Stato:",
      country: "Paese:",
      postal: "CAP:",
      affiliation: "3. Affiliazione ecclesiastica / accademica",
      role: "Posizione/Funzione:",
      field: "Area di competenza:",
      other: "Altro?",
      participation: "4. Modalità di partecipazione",
      academic: "5. Invio di un articolo accademico",
      paperTitle: "Titolo dell'articolo:",
      thematicArea: "Area tematica:",
      needs: "6. Esigenze particolari",
      hasNeeds: "Ha esigenze particolari?",
      which: "Quali?",
      requires: "Necessità:",
      lodging: "7. Alloggio e logistica",
      lodgingQuestion: "Desidera informazioni sull'alloggio?",
      arrival: "Data di arrivo prevista:",
      departure: "Data di partenza prevista:",
      cultural: "Parteciperà agli eventi culturali e alle visite guidate?",
      language: "8. Lingua preferita",
      certification: "9. Attestato",
      wantsCertificate: "Desidera un attestato?",
      certificateName: "Nome esattamente come deve apparire sull'attestato:",
      image: "10. Autorizzazione all'utilizzo dell'immagine",
      imageText:
        "Autorizzo l'utilizzo della mia immagine, della mia voce e la mia partecipazione a fotografie, registrazioni e trasmissioni effettuate durante il 1° Congresso Internazionale di Teologia sulla Paternità di Dio, per scopi istituzionali, accademici, evangelistici e promozionali, senza alcun costo per l'organizzazione.",
      commitment: "11. Dichiarazione di impegno",
      commitmentText: "Dichiaro che le informazioni fornite sono veritiere e di essere a conoscenza del regolamento di partecipazione al Congresso.",
      commitmentCity: "Città:",
      commitmentDate: "Data:",
      signature: "Firma:"
    },
    yesNo: ["Sì", "No"],
    sexoOptions: ["Maschio", "Femmina"],
    estadoCivilOptions: ["Celibe/Nubile", "Coniugato/a", "Religioso/a", "Sacerdote", "Vescovo", "Altro"],
    cargoOptions: ["Vescovo", "Sacerdote", "Diacono", "Religioso", "Seminarista", "Laico", "Professore", "Ricercatore", "Studente", "Altro"],
    areaAtuacaoOptions: ["Teologia sistematica", "Teologia biblica", "Teologia morale", "Spiritualità", "Liturgia", "Catechesi", "Pastorale", "Diritto canonico", "Filosofia", "Studi religiosi"],
    modalidadeParticipacaoOptions: ["Partecipante", "Partecipante con attestato", "Presentazione di comunicazione scientifica", "Relatore invitato"],
    specialNeedsOptions: ["Accessibilità fisica", "Interprete di lingua dei segni", "Traduzione simultanea", "Pasti speciali", "Altro"],
    preferredLanguageOptions: ["Portoghese", "Spagnolo", "Inglese", "Italiano", "Francese"]
  }
};

export function RegistrationPage() {
  const [locale, setLocale] = useState<Locale>("pt");
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<string>("");
  const t = locales[locale];
  const r = registrationCopy[locale];
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
              {r.languageLabels[item]}
            </button>
          ))}
        </div>
      </header>

      <main className={`registration-page ${dragging ? "is-dragging" : ""}`}>
        <section className="registration-hero" aria-labelledby="registration-title">
          <div className="registration-hero-inner">
            <h1 id="registration-title">
              <span>{r.hero[0]}</span>
              <span>{r.hero[1]}</span>
            </h1>
            <p className="registration-theme">{r.hero[2]}</p>
            <blockquote>
              {r.hero[3]} <strong>{r.hero[4]}</strong>
            </blockquote>
          </div>
        </section>

        <form className="registration-form" id="formulario" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="personal-fieldset">
            <legend>{r.fields.personal}</legend>
            <PlainInput className="span-full" error={errors.nome?.message} label={r.fields.fullName} {...register("nome", { required: r.required })} />
            <PlainInput className="span-full" error={errors.nomeCredencial?.message} label={r.fields.badgeName} {...register("nomeCredencial", { required: r.required })} />
            <PlainInput error={errors.dataNascimento?.message} label={r.fields.birthDate} {...register("dataNascimento", { required: r.required })} />
            <PlainInput error={errors.cpf?.message} label={r.fields.cpf} {...register("cpf", { required: r.required })} />
            <PlainInput label={r.fields.passport} {...register("passaporte")} />
            <PlainInput error={errors.nacionalidade?.message} label={r.fields.nationality} {...register("nacionalidade", { required: r.required })} />

            <RadioGroup
              label={r.fields.gender}
              name="sexo"
              options={r.sexoOptions}
              register={register("sexo", { required: r.required })}
              error={errors.sexo?.message}
            />
            <RadioGroup
              label={r.fields.marital}
              name="estadoCivil"
              options={r.estadoCivilOptions}
              register={register("estadoCivil", { required: r.required })}
              error={errors.estadoCivil?.message}
            />
          </fieldset>

          <fieldset className="contact-fieldset">
            <legend>{r.fields.contact}</legend>
            <PlainInput error={errors.telefoneWhatsapp?.message} label={r.fields.phone} {...register("telefoneWhatsapp", { required: r.required })} />
            <PlainInput error={errors.emailContato?.message} label={r.fields.email} {...register("emailContato", { required: r.required })} />
            <PlainInput error={errors.endereco?.message} label={r.fields.address} {...register("endereco", { required: r.required })} />
            <PlainInput error={errors.cidade?.message} label={r.fields.city} {...register("cidade", { required: r.required })} />
            <PlainInput error={errors.estado?.message} label={r.fields.state} {...register("estado", { required: r.required })} />
            <PlainInput error={errors.paisContato?.message} label={r.fields.country} {...register("paisContato", { required: r.required })} />
            <PlainInput className="span-left" error={errors.cep?.message} label={r.fields.postal} {...register("cep", { required: r.required })} />
          </fieldset>

          <fieldset className="vinculo-fieldset">
            <legend>{r.fields.affiliation}</legend>
            <RadioGroup
              label={r.fields.role}
              name="cargoFuncao"
              options={r.cargoOptions}
              register={register("cargoFuncao", { required: r.required })}
              error={errors.cargoFuncao?.message}
            />
            <RadioGroup
              label={r.fields.field}
              name="areaAtuacao"
              options={r.areaAtuacaoOptions}
              register={register("areaAtuacao", { required: r.required })}
              error={errors.areaAtuacao?.message}
            />
            <InlineLineField
              label={r.fields.other}
              error={errors.areaOutraQual?.message}
              register={register("areaOutraQual")}
            />
          </fieldset>

          <fieldset className="participation-fieldset">
            <legend>{r.fields.participation}</legend>
            <RadioGroup
              label=""
              name="modalidadeParticipacao"
              options={r.modalidadeParticipacaoOptions}
              register={register("modalidadeParticipacao", { required: r.required })}
              error={errors.modalidadeParticipacao?.message}
            />
          </fieldset>

          <fieldset className="academic-fieldset">
            <legend>{r.fields.academic}</legend>
            <InlineLineField
              label={r.fields.paperTitle}
              error={errors.tituloTrabalho?.message}
              register={register("tituloTrabalho", { required: r.required })}
            />
            <InlineLineField
              label={r.fields.thematicArea}
              error={errors.areaTematica?.message}
              register={register("areaTematica", { required: r.required })}
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
              <span>{r.fileButton}</span>
            </label>
            <div className="upload-list">
              {uploads.map((upload) => (
                <div className="upload-item" key={upload.id}>
                  <div>
                    <span>{upload.file.name}</span>
                    <button
                      aria-label={`${r.remove} ${upload.file.name}`}
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
            <legend>{r.fields.needs}</legend>
            <p className="field-question">{r.fields.hasNeeds}</p>
            <div className="question-inline-row">
              <RadioGroup
                label=""
                name="necessidadeEspecifica"
                options={r.yesNo}
                register={register("necessidadeEspecifica", { required: r.required })}
                error={errors.necessidadeEspecifica?.message}
              />
              <InlineLineField
                label={r.fields.which}
                error={errors.necessidadeQual?.message}
                register={register("necessidadeQual")}
              />
            </div>
            <p className="field-subtitle">{r.fields.requires}</p>
            <OptionCloud options={r.specialNeedsOptions} register={register("necessidadesEspeciais")} />
          </fieldset>

          <fieldset className="hospedagem-fieldset">
            <legend>{r.fields.lodging}</legend>
            <p className="field-question">{r.fields.lodgingQuestion}</p>
            <RadioGroup
              label=""
              name="hospedagemNecessita"
              options={r.yesNo}
              register={register("hospedagemNecessita", { required: r.required })}
              error={errors.hospedagemNecessita?.message}
            />
            <div className="pair-line-row">
              <InlineLineField
                label={r.fields.arrival}
                error={errors.chegadaPrevista?.message}
                register={register("chegadaPrevista")}
              />
              <InlineLineField
                label={r.fields.departure}
                error={errors.saidaPrevista?.message}
                register={register("saidaPrevista")}
              />
            </div>
            <p className="field-question emphasis">{r.fields.cultural}</p>
            <RadioGroup
              label=""
              name="participaraEventosCulturais"
              options={r.yesNo}
              register={register("participaraEventosCulturais", { required: r.required })}
              error={errors.participaraEventosCulturais?.message}
            />
          </fieldset>

          <fieldset className="language-fieldset">
            <legend>{r.fields.language}</legend>
            <RadioGroup
              label=""
              name="idiomaPreferencial"
              options={r.preferredLanguageOptions}
              register={register("idiomaPreferencial", { required: r.required })}
              error={errors.idiomaPreferencial?.message}
            />
          </fieldset>

          <fieldset className="certification-fieldset">
            <legend>{r.fields.certification}</legend>
            <p className="field-question">{r.fields.wantsCertificate}</p>
            <RadioGroup
              label=""
              name="certificacaoDeseja"
              options={r.yesNo}
              register={register("certificacaoDeseja", { required: r.required })}
              error={errors.certificacaoDeseja?.message}
            />
            <InlineLineField
              label={r.fields.certificateName}
              error={errors.nomeCertificado?.message}
              register={register("nomeCertificado")}
            />
          </fieldset>

          <fieldset className="image-fieldset">
            <legend>{r.fields.image}</legend>
            <p className="field-copy">{r.fields.imageText}</p>
            <RadioGroup
              label=""
              name="autorizacaoImagem"
              options={r.yesNo}
              register={register("autorizacaoImagem", { required: r.required })}
              error={errors.autorizacaoImagem?.message}
            />
          </fieldset>

          <fieldset className="commitment-fieldset">
            <legend>{r.fields.commitment}</legend>
            <p className="field-copy">{r.fields.commitmentText}</p>
            <div className="pair-line-row">
              <InlineLineField label={r.fields.commitmentCity} error={errors.cidadeCompromisso?.message} register={register("cidadeCompromisso")} />
              <InlineLineField label={r.fields.commitmentDate} error={errors.dataCompromisso?.message} register={register("dataCompromisso")} />
            </div>
            <InlineLineField
              label={r.fields.signature}
              error={errors.assinaturaCompromisso?.message}
              className="signature-line"
              register={register("assinaturaCompromisso")}
            />
          </fieldset>

          <button className="cta-button form-submit" disabled={isSubmitting} type="submit">
            <ArrowIcon />
            <span>{isSubmitting ? r.submitting : r.submit}</span>
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
