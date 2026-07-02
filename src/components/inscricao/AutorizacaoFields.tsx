import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function AutorizacaoFields({
  copy,
  errors,
  register
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  register: UseFormRegister<InscricaoFormData>;
}) {
  return (
    <FormSection className="image-fieldset" title={copy.fields.image}>
      <p className="field-copy">{copy.fields.imageText}</p>
      <RadioGroup error={errors.autorizacaoImagem?.message} label="" name="autorizacaoImagem" options={copy.yesNo} register={register("autorizacaoImagem", { required: copy.required })} />
    </FormSection>
  );
}

