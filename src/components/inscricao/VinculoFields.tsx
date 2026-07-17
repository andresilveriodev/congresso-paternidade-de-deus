import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { InlineLineField, RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function VinculoFields({
  copy,
  errors,
  register,
  showOtherAreaField
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  register: UseFormRegister<InscricaoFormData>;
  showOtherAreaField: boolean;
}) {
  const fields = copy.fields;

  return (
    <FormSection className="vinculo-fieldset" title={fields.affiliation}>
      <RadioGroup error={errors.cargoFuncao?.message} label={fields.role} name="cargoFuncao" options={copy.cargoOptions} register={register("cargoFuncao", { required: copy.required })} />
      <RadioGroup error={errors.areaAtuacao?.message} label={fields.field} name="areaAtuacao" options={copy.areaAtuacaoOptions} register={register("areaAtuacao", { required: copy.required })} />
      {showOtherAreaField ? <InlineLineField error={errors.areaOutraQual?.message} label={fields.other} register={register("areaOutraQual")} /> : null}
    </FormSection>
  );
}

