"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type PlainInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function PlainInput({ className, label, error, onBlur, onFocus, type, ...props }: PlainInputProps) {
  const isDateInput = type === "date";
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);

  return (
    <label className={`plain-field${className ? ` ${className}` : ""}`}>
      <input
        {...props}
        onBlur={(event) => {
          onBlur?.(event);
          if (isDateInput && !event.currentTarget.value) {
            setIsDatePickerActive(false);
          }
        }}
        onFocus={(event) => {
          if (isDateInput) {
            setIsDatePickerActive(true);
          }
          onFocus?.(event);
        }}
        placeholder={label}
        type={isDateInput && !isDatePickerActive ? "text" : type}
      />
      {error ? <small>{error}</small> : null}
    </label>
  );
}

type RadioGroupProps = {
  label: string;
  name: string;
  options: string[];
  register: UseFormRegisterReturn;
  error?: string;
};

export function RadioGroup({ error, label, name, options, register }: RadioGroupProps) {
  return (
    <div className={`registration-radio-group${label ? "" : " no-title"}`} role="radiogroup" aria-labelledby={label ? `${name}-label` : undefined}>
      {label ? (
        <span id={`${name}-label`} className="radio-group-title">
          {label}
        </span>
      ) : null}
      <div className="radio-options">
        {options.map((option) => (
          <label key={option}>
            <span>{option}</span>
            <input type="radio" value={option} {...register} />
          </label>
        ))}
      </div>
      {error ? <small>{error}</small> : null}
    </div>
  );
}

type InlineLineFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
};

export function InlineLineField({ className, error, label, register }: InlineLineFieldProps) {
  return (
    <label className={`inline-line-field${className ? ` ${className}` : ""}`}>
      <span>{label}</span>
      <input placeholder=" " {...register} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}

type OptionCloudProps = {
  options: string[];
  register: UseFormRegisterReturn;
};

export function OptionCloud({ options, register }: OptionCloudProps) {
  return (
    <div className="option-cloud">
      <div className="radio-options option-cloud-grid">
        {options.map((option) => (
          <label key={option}>
            <span>{option}</span>
            <input type="checkbox" value={option} {...register} />
          </label>
        ))}
      </div>
    </div>
  );
}
