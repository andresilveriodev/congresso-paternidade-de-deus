import { ArrowIcon } from "@/components/ArrowIcon";

export function SubmitInscricaoButton({
  isSubmitting,
  label,
  loadingLabel
}: {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <button className="cta-button form-submit" disabled={isSubmitting} type="submit">
      <ArrowIcon />
      <span>{isSubmitting ? loadingLabel : label}</span>
    </button>
  );
}

