import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export function AceiteTermosField({
  copy,
  errors,
  onOpenTerms,
  register
}: {
  copy: RegistrationCopy;
  errors: FieldErrors<InscricaoFormData>;
  onOpenTerms: () => void;
  register: UseFormRegister<InscricaoFormData>;
}) {
  const fields = copy.fields;

  return (
    <div className="terms-acceptance-field">
      <div className="terms-acceptance-row">
        <input id="aceiteTermos" type="checkbox" {...register("aceiteTermos")} />
        <span>
          <label htmlFor="aceiteTermos">{fields.termsAcceptancePrefix}</label>{" "}
          <button
            type="button"
            onClick={(event) => {
              onOpenTerms();
            }}
          >
            {fields.termsAcceptanceLink}
          </button>
          <label htmlFor="aceiteTermos">{fields.termsAcceptanceSuffix}</label>
        </span>
      </div>
      {errors.aceiteTermos?.message ? <small>{errors.aceiteTermos.message}</small> : null}
    </div>
  );
}
