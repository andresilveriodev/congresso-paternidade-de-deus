"use client";

import { useEffect, useState } from "react";
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
  "tituloTrabalho",
  "areaTematica",
  "necessidadeEspecifica",
  "hospedagemNecessita",
  "participaraEventosCulturais",
  "idiomaPreferencial",
  "certificacaoDeseja",
  "autorizacaoImagem",
  "cidadeCompromisso",
  "dataCompromisso",
  "assinaturaCompromisso"
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

function hasStartedRegistration(values: Partial<InscricaoFormData>, hasUploads: boolean) {
  return (
    hasUploads ||
    Object.entries(values).some(([key, value]) => key !== "locale" && hasProgressValue(value))
  );
}

function getRegistrationProgress(values: Partial<InscricaoFormData>, hasUploads: boolean) {
  let total = requiredProgressFields.length + 2;
  let completed = requiredProgressFields.filter((field) => hasProgressValue(values[field])).length;

  if (hasProgressValue(values.cpf) || hasProgressValue(values.passaporte)) {
    completed += 1;
  }

  if (hasUploads) {
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

  return Math.min(100, Math.round((completed / total) * 100));
}

export function RegistrationPage({ copy, labels, locale }: RegistrationPageProps) {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
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
  const requiresDescription = Boolean(necessidade?.toLowerCase().startsWith("s"));
  const requiresCertificateName = Boolean(certificacao?.toLowerCase().startsWith("s"));
  const hasUploads = uploads.length > 0;
  const hasProgressStarted = hasStartedRegistration(formValues, hasUploads);
  const registrationProgress = getRegistrationProgress(formValues, hasUploads);

  useEffect(() => {
    if (!requiresCertificateName) {
      clearErrors("nomeCertificado");
      setValue("nomeCertificado", "");
    }
  }, [clearErrors, requiresCertificateName, setValue]);

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
    uploads.forEach((upload) => formData.append("arquivos", upload.file));

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
      window.location.assign(result.data.redirectUrl);
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
          <VinculoFields copy={copy} errors={errors} register={register} />
          <ModalidadeFields copy={copy} errors={errors} register={register} />
          <TrabalhoAcademicoFields
            copy={copy}
            dragging={dragging}
            errors={errors}
            onAddFiles={addFiles}
            onDraggingChange={setDragging}
            onRemoveUpload={(id) => setUploads((current) => current.filter((item) => item.id !== id))}
            register={register}
            uploadError={uploadError}
            uploads={uploads}
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
          <SubmitInscricaoButton isSubmitting={isSubmitting} label={copy.submit} loadingLabel={copy.submitting} />
          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </main>
    </>
  );
}
