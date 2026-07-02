import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { InlineLineField } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function TermoFields({
  copy,
  errors,
  register
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  register: UseFormRegister<InscricaoFormData>;
}) {
  const fields = copy.fields;

  return (
    <FormSection className="commitment-fieldset" title={fields.commitment}>
      <p className="field-copy">{fields.commitmentText}</p>
      <div className="pair-line-row">
        <InlineLineField error={errors.cidadeCompromisso?.message} label={fields.commitmentCity} register={register("cidadeCompromisso", { required: copy.required })} />
        <InlineLineField error={errors.dataCompromisso?.message} label={fields.commitmentDate} register={register("dataCompromisso", { required: copy.required })} />
      </div>
      <InlineLineField className="signature-line" error={errors.assinaturaCompromisso?.message} label={fields.signature} register={register("assinaturaCompromisso", { required: copy.required })} />
    </FormSection>
  );
}
