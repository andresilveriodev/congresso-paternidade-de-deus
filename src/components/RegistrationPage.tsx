"use client";

import { useEffect, useState } from "react";
import { Drawer } from "@/components/Drawer";
import { AceiteTermosField } from "@/components/inscricao/AceiteTermosField";
import { useForm, useWatch } from "react-hook-form";
import { AutorizacaoFields } from "@/components/inscricao/AutorizacaoFields";
import { CertificacaoFields } from "@/components/inscricao/CertificacaoFields";
import { ContatosFields } from "@/components/inscricao/ContatosFields";
import { DadosPessoaisFields } from "@/components/inscricao/DadosPessoaisFields";
import { HospedagemFields } from "@/components/inscricao/HospedagemFields";
import { IdiomaFields } from "@/components/inscricao/IdiomaFields";
import { ModalidadeFields } from "@/components/inscricao/ModalidadeFields";
import { NecessidadesFields } from "@/components/inscricao/NecessidadesFields";
import { SubmitInscricaoButton } from "@/components/inscricao/SubmitInscricaoButton";
import { TermoFields } from "@/components/inscricao/TermoFields";
import { TrabalhoAcademicoFields, type UploadItem } from "@/components/inscricao/TrabalhoAcademicoFields";
import { VinculoFields } from "@/components/inscricao/VinculoFields";
import { Header } from "@/components/layout/Header";
import { getLegalPages } from "@/content/legal";
import { inscricaoSchema, zodIssuesToFieldErrors } from "@/lib/validations/inscricao.schema";
import { images } from "@/lib/site-data";
import type { ApiResponse } from "@/types/api";
import type { InscricaoCreationResult, InscricaoFormData, RegistrationCopy } from "@/types/inscricao";
import type { Locale } from "@/types/locale";

type RegistrationPageProps = {
  copy: RegistrationCopy;
  labels: Record<string, string>;
  locale: Locale;
};

const successMessages: Record<Locale, { title: string; description: string; countdown: (seconds: number) => string }> = {
  pt: {
    title: "Cadastro realizado com sucesso!",
    description: "As informações da sua inscrição foram enviadas para o seu e-mail.",
    countdown: (seconds) => `Você será redirecionado para a página inicial em ${seconds} segundos.`
  },
  en: {
    title: "Registration completed successfully!",
    description: "Your registration information has been sent to your email address.",
    countdown: (seconds) => `You will be redirected to the home page in ${seconds} seconds.`
  },
  es: {
    title: "¡Inscripción completada con éxito!",
    description: "La información de tu inscripción fue enviada a tu correo electrónico.",
    countdown: (seconds) => `Serás redirigido a la página de inicio en ${seconds} segundos.`
  },
  it: {
    title: "Registrazione completata con successo!",
    description: "Le informazioni sulla registrazione sono state inviate al tuo indirizzo e-mail.",
    countdown: (seconds) => `Sarai reindirizzato alla pagina iniziale tra ${seconds} secondi.`
  }
};

const requiredProgressFields: Array<keyof InscricaoFormData> = [
  "nome",
  "nomeCredencial",
  "dataNascimento",
  "nacionalidade",
  "sexo",
  "estadoCivil",
  "telefoneWhatsapp",
  "emailContato",
  "endereco",
  "cidade",
  "estado",
  "paisContato",
  "cep",
  "cargoFuncao",
  "areaAtuacao",
  "modalidadeParticipacao",
  "apresentaraTrabalho",
  "necessidadeEspecifica",
  "hospedagemNecessita",
  "participaraEventosCulturais",
  "idiomaPreferencial",
  "certificacaoDeseja",
  "autorizacaoImagem",
  "cidadeCompromisso",
  "dataCompromisso",
  "assinaturaCompromisso",
  "aceiteTermos"
];

function hasProgressValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.some(hasProgressValue);
  }

  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

function isAffirmativeProgressValue(value: unknown) {
  return typeof value === "string" && (value.trim().toLowerCase().startsWith("s") || value.trim().toLowerCase() === "yes");
}

function isOtherAreaValue(value: unknown) {
  if (typeof value !== "string") return false;

  const normalized = value.trim().toLowerCase();
  return normalized === "outra" || normalized === "otra" || normalized === "other" || normalized === "altro";
}

function hasStartedRegistration(values: Partial<InscricaoFormData>, hasUploads: boolean) {
  return (
    hasUploads ||
    Object.entries(values).some(([key, value]) => key !== "locale" && hasProgressValue(value))
  );
}

function getRegistrationProgress(values: Partial<InscricaoFormData>) {
  let total = requiredProgressFields.length + 1;
  let completed = requiredProgressFields.filter((field) => hasProgressValue(values[field])).length;

  if (hasProgressValue(values.cpf) || hasProgressValue(values.passaporte)) {
    completed += 1;
  }

  if (isAffirmativeProgressValue(values.necessidadeEspecifica)) {
    total += 1;
    if (hasProgressValue(values.necessidadeQual)) {
      completed += 1;
    }
  }

  if (isAffirmativeProgressValue(values.certificacaoDeseja)) {
    total += 1;
    if (hasProgressValue(values.nomeCertificado)) {
      completed += 1;
    }
  }

  if (isAffirmativeProgressValue(values.apresentaraTrabalho)) {
    total += 2;
    if (hasProgressValue(values.tituloTrabalho)) {
      completed += 1;
    }
    if (hasProgressValue(values.areaTematica)) {
      completed += 1;
    }
  }

  return Math.min(100, Math.round((completed / total) * 100));
}

export function RegistrationPage({ copy, labels, locale }: RegistrationPageProps) {
  const legalPages = getLegalPages(locale);
  const successMessage = successMessages[locale];
  const [termsDrawerOpen, setTermsDrawerOpen] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(6);
  const {
    clearErrors,
    control,
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<InscricaoFormData>({
    defaultValues: {
      locale,
      necessidadesEspeciais: []
    }
  });
  const formValues = (useWatch({ control }) ?? {}) as Partial<InscricaoFormData>;
  const necessidade = useWatch({ control, name: "necessidadeEspecifica" });
  const certificacao = useWatch({ control, name: "certificacaoDeseja" });
  const apresentaraTrabalho = useWatch({ control, name: "apresentaraTrabalho" });
  const areaAtuacao = useWatch({ control, name: "areaAtuacao" });
  const requiresDescription = Boolean(necessidade?.toLowerCase().startsWith("s"));
  const requiresCertificateName = isAffirmativeProgressValue(certificacao);
  const willPresentPaper = isAffirmativeProgressValue(apresentaraTrabalho);
  const showOtherAreaField = isOtherAreaValue(areaAtuacao);
  const hasUploads = uploads.length > 0;
  const hasProgressStarted = hasStartedRegistration(formValues, hasUploads);
  const registrationProgress = getRegistrationProgress(formValues);

  useEffect(() => {
    if (!registrationComplete) return;

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(`/${locale}`);
    }, 6000);
    const countdownTimer = window.setInterval(() => {
      setRedirectSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => {
      window.clearTimeout(redirectTimer);
      window.clearInterval(countdownTimer);
    };
  }, [locale, registrationComplete]);

  useEffect(() => {
    if (!showOtherAreaField) {
      clearErrors("areaOutraQual");
      setValue("areaOutraQual", "");
    }
  }, [clearErrors, setValue, showOtherAreaField]);

  useEffect(() => {
    if (!requiresCertificateName) {
      clearErrors("nomeCertificado");
      setValue("nomeCertificado", "");
    }
  }, [clearErrors, requiresCertificateName, setValue]);

  useEffect(() => {
    if (!willPresentPaper) {
      clearErrors(["tituloTrabalho", "areaTematica"]);
      setValue("tituloTrabalho", "");
      setValue("areaTematica", "");
    }
  }, [clearErrors, setValue, willPresentPaper]);

  const handlePaperAnswerChange = (value: string) => {
    if (!isAffirmativeProgressValue(value)) {
      setUploads([]);
      setUploadError("");
      setDragging(false);
    }
  };

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const nextFiles = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      progress: 0
    }));

    if (nextFiles.length > 0) {
      setUploadError("");
      setStatus("");
    }

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

  const onSubmit = async (values: InscricaoFormData) => {
    clearErrors();
    setUploadError("");
    setStatus("");

    const parsed = inscricaoSchema.safeParse({ ...values, locale });

    if (!parsed.success) {
      const fieldErrors = parsed.success ? {} : zodIssuesToFieldErrors(parsed.error);
      if (fieldErrors.aceiteTermos) {
        fieldErrors.aceiteTermos = copy.fields.termsAcceptanceError;
      }
      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof InscricaoFormData, { message });
      });
      setStatus(Object.values(fieldErrors)[0] ?? "Revise os campos destacados.");
      return;
    }

    const formData = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value) {
        formData.append(key, String(value));
      }
    });
    if (isAffirmativeProgressValue(parsed.data.apresentaraTrabalho)) {
      uploads.forEach((upload) => formData.append("arquivos", upload.file));
    }

    let result: ApiResponse<InscricaoCreationResult>;

    try {
      const response = await fetch("/api/inscricao", {
        method: "POST",
        body: formData
      });
      result = (await response.json()) as ApiResponse<InscricaoCreationResult>;
    } catch {
      setStatus("Nao foi possivel enviar sua inscricao agora. Verifique sua conexao e tente novamente.");
      return;
    }

    if (result.success) {
      setRegistrationComplete(true);
      return;
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (field === "arquivos") {
          setUploadError(message);
          return;
        }

        setError(field as keyof InscricaoFormData, { message });
      });
    }

    setStatus(result.message);
  };

  const headerLabels = {
    ...labels,
    registration: locale === "pt" ? "Inscrição" : labels.registration,
    schedule: locale === "pt" ? "Programação" : labels.schedule,
    speakers: locale === "pt" ? "Conferencistas" : labels.speakers,
    papers: locale === "pt" ? "Trabalho científico" : labels.papers,
    location: locale === "pt" ? "Local" : labels.location,
    language: locale === "pt" ? "Idioma" : labels.language
  };

  return (
    <>
      <Header
        brandAlt="Paternidade de Deus"
        brandHref={`/${locale}`}
        brandImage={images.markRegistration}
        labels={headerLabels}
        languageLabels={copy.languageLabels}
        languagePathSuffix="/inscricao"
        locale={locale}
        showRegistrationButton={false}
        variant="registration"
      />
      {hasProgressStarted ? (
        <div
          aria-label="Progresso do formulario"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={registrationProgress}
          className="registration-progress"
          role="progressbar"
        >
          <span style={{ transform: `scaleX(${registrationProgress / 100})` }} />
        </div>
      ) : null}

      <main className={`registration-page ${dragging ? "is-dragging" : ""}`}>
        <section className="registration-hero" aria-labelledby="registration-title">
          <div className="registration-hero-inner">
            <h1 id="registration-title">
              <span>{copy.hero[0]}</span>
              <span>{copy.hero[1]}</span>
            </h1>
            <p className="registration-theme">{copy.hero[2]}</p>
            <blockquote>
              {copy.hero[3]} <strong>{copy.hero[4]}</strong>
            </blockquote>
          </div>
        </section>

        <form className="registration-form" id="formulario" noValidate onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" value={locale} {...register("locale")} />
          <DadosPessoaisFields copy={copy} errors={errors} register={register} />
          <ContatosFields copy={copy} errors={errors} register={register} />
          <VinculoFields copy={copy} errors={errors} register={register} showOtherAreaField={showOtherAreaField} />
          <ModalidadeFields copy={copy} errors={errors} register={register} />
          <TrabalhoAcademicoFields
            copy={copy}
            dragging={dragging}
            errors={errors}
            onAddFiles={addFiles}
            onDraggingChange={setDragging}
            onPaperAnswerChange={handlePaperAnswerChange}
            onRemoveUpload={(id) => setUploads((current) => current.filter((item) => item.id !== id))}
            register={register}
            uploadError={uploadError}
            uploads={uploads}
            willPresentPaper={willPresentPaper}
          />
          <NecessidadesFields copy={copy} errors={errors} register={register} requiresDescription={requiresDescription} />
          <HospedagemFields copy={copy} errors={errors} register={register} />
          <IdiomaFields copy={copy} errors={errors} register={register} />
          <CertificacaoFields
            copy={copy}
            errors={errors}
            register={register}
            requiresCertificateName={requiresCertificateName}
          />
          <AutorizacaoFields copy={copy} errors={errors} register={register} />
          <TermoFields copy={copy} errors={errors} register={register} />
          <AceiteTermosField
            copy={copy}
            errors={errors}
            onOpenTerms={() => setTermsDrawerOpen(true)}
            register={register}
          />
          <SubmitInscricaoButton isSubmitting={isSubmitting} label={copy.submit} loadingLabel={copy.submitting} />
          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </main>

      <Drawer
        closeLabel={labels.close}
        onClose={() => setTermsDrawerOpen(false)}
        open={termsDrawerOpen}
        title={legalPages.terms.title}
      >
        <div className="terms-drawer-content">
          <p>{legalPages.terms.description}</p>
          {legalPages.terms.sections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </Drawer>
      {registrationComplete ? (
        <div className="registration-success-backdrop" role="presentation">
          <section
            aria-describedby="registration-success-description"
            aria-labelledby="registration-success-title"
            aria-live="assertive"
            aria-modal="true"
            className="registration-success-modal"
            role="dialog"
          >
            <span aria-hidden="true" className="registration-success-icon">✓</span>
            <h2 id="registration-success-title">{successMessage.title}</h2>
            <p id="registration-success-description">{successMessage.description}</p>
            <p className="registration-success-countdown">
              {successMessage.countdown(redirectSeconds)}
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
}
