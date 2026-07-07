import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { PlainInput, RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function DadosPessoaisFields({
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
    <FormSection className="personal-fieldset" title={fields.personal}>
      <PlainInput className="span-full" error={errors.nome?.message} label={fields.fullName} {...register("nome", { required: copy.required })} />
      <PlainInput className="span-full" error={errors.nomeCredencial?.message} label={fields.badgeName} {...register("nomeCredencial", { required: copy.required })} />
      <PlainInput error={errors.dataNascimento?.message} label={fields.birthDate} {...register("dataNascimento", { required: copy.required })} />
      <PlainInput error={errors.cpf?.message} label={fields.cpf} {...register("cpf")} />
      <PlainInput error={errors.passaporte?.message} label={fields.passport} {...register("passaporte")} />
      <PlainInput error={errors.nacionalidade?.message} label={fields.nationality} {...register("nacionalidade", { required: copy.required })} />
      <RadioGroup error={errors.sexo?.message} label={fields.gender} name="sexo" options={copy.sexoOptions} register={register("sexo", { required: copy.required })} />
      <RadioGroup error={errors.estadoCivil?.message} label={fields.marital} name="estadoCivil" options={copy.estadoCivilOptions} register={register("estadoCivil", { required: copy.required })} />
    </FormSection>
  );
}

