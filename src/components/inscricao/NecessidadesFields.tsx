import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { InlineLineField, OptionCloud, RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function NecessidadesFields({
  copy,
  errors,
  register,
  requiresDescription
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  register: UseFormRegister<InscricaoFormData>;
  requiresDescription: boolean;
}) {
  const fields = copy.fields;

  return (
    <FormSection className="special-needs-fieldset" title={fields.needs}>
      <p className="field-question">{fields.hasNeeds}</p>
      <div className="question-inline-row">
        <RadioGroup error={errors.necessidadeEspecifica?.message} label="" name="necessidadeEspecifica" options={copy.yesNo} register={register("necessidadeEspecifica", { required: copy.required })} />
        <InlineLineField error={errors.necessidadeQual?.message} label={fields.which} register={register("necessidadeQual", requiresDescription ? { required: copy.required } : undefined)} />
      </div>
      <p className="field-subtitle">{fields.requires}</p>
      <OptionCloud options={copy.specialNeedsOptions} register={register("necessidadesEspeciais")} />
    </FormSection>
  );
}

