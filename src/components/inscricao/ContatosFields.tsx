import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { PlainInput } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function ContatosFields({
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
    <FormSection className="contact-fieldset" title={fields.contact}>
      <PlainInput error={errors.telefoneWhatsapp?.message} label={fields.phone} {...register("telefoneWhatsapp", { required: copy.required })} />
      <PlainInput error={errors.emailContato?.message} label={fields.email} type="email" {...register("emailContato", { required: copy.required })} />
      <PlainInput error={errors.endereco?.message} label={fields.address} {...register("endereco", { required: copy.required })} />
      <PlainInput error={errors.cidade?.message} label={fields.city} {...register("cidade", { required: copy.required })} />
      <PlainInput error={errors.estado?.message} label={fields.state} {...register("estado", { required: copy.required })} />
      <PlainInput error={errors.paisContato?.message} label={fields.country} {...register("paisContato", { required: copy.required })} />
      <PlainInput className="span-left" error={errors.cep?.message} label={fields.postal} {...register("cep", { required: copy.required })} />
    </FormSection>
  );
}

