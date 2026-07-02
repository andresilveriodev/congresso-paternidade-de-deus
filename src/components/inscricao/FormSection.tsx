import type { ReactNode } from "react";

export function FormSection({
  children,
  className,
  title
}: {
  children: ReactNode;
  className: string;
  title: string;
}) {
  return (
    <fieldset className={className}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

