import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { InlineLineField, RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function CertificacaoFields({
  copy,
  errors,
  register,
  requiresCertificateName
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  register: UseFormRegister<InscricaoFormData>;
  requiresCertificateName: boolean;
}) {
  const fields = copy.fields;

  return (
    <FormSection className="certification-fieldset" title={fields.certification}>
      <p className="field-question">{fields.wantsCertificate}</p>
      <RadioGroup error={errors.certificacaoDeseja?.message} label="" name="certificacaoDeseja" options={copy.yesNo} register={register("certificacaoDeseja", { required: copy.required })} />
      {requiresCertificateName ? (
        <InlineLineField error={errors.nomeCertificado?.message} label={fields.certificateName} register={register("nomeCertificado", { required: copy.required })} />
      ) : null}
    </FormSection>
  );
}
