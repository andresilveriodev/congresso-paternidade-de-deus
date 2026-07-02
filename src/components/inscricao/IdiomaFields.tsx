import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function IdiomaFields({
  copy,
  errors,
  register
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  register: UseFormRegister<InscricaoFormData>;
}) {
  return (
    <FormSection className="language-fieldset" title={copy.fields.language}>
      <RadioGroup error={errors.idiomaPreferencial?.message} label="" name="idiomaPreferencial" options={copy.preferredLanguageOptions} register={register("idiomaPreferencial", { required: copy.required })} />
    </FormSection>
  );
}

