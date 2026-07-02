import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { InlineLineField, RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function HospedagemFields({
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
    <FormSection className="hospedagem-fieldset" title={fields.lodging}>
      <p className="field-question">{fields.lodgingQuestion}</p>
      <RadioGroup error={errors.hospedagemNecessita?.message} label="" name="hospedagemNecessita" options={copy.yesNo} register={register("hospedagemNecessita", { required: copy.required })} />
      <div className="pair-line-row">
        <InlineLineField error={errors.chegadaPrevista?.message} label={fields.arrival} register={register("chegadaPrevista")} />
        <InlineLineField error={errors.saidaPrevista?.message} label={fields.departure} register={register("saidaPrevista")} />
      </div>
      <p className="field-question emphasis">{fields.cultural}</p>
      <RadioGroup error={errors.participaraEventosCulturais?.message} label="" name="participaraEventosCulturais" options={copy.yesNo} register={register("participaraEventosCulturais", { required: copy.required })} />
    </FormSection>
  );
}

