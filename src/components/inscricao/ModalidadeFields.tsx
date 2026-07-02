import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function ModalidadeFields({
  copy,
  errors,
  register
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  register: UseFormRegister<InscricaoFormData>;
}) {
  return (
    <FormSection className="participation-fieldset" title={copy.fields.participation}>
      <RadioGroup
        error={errors.modalidadeParticipacao?.message}
        label=""
        name="modalidadeParticipacao"
        options={copy.modalidadeParticipacaoOptions}
        register={register("modalidadeParticipacao", { required: copy.required })}
      />
    </FormSection>
  );
}

