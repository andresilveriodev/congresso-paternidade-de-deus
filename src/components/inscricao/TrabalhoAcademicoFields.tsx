"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormSection } from "@/components/inscricao/FormSection";
import { InlineLineField, RadioGroup } from "@/components/inscricao/form-controls";
import type { InscricaoFormData, RegistrationCopy } from "@/types/inscricao";

export type UploadItem = {
  id: string;
  file: File;
  progress: number;
};

export function TrabalhoAcademicoFields({
  copy,
  dragging,
  errors,
  onAddFiles,
  onDraggingChange,
  onRemoveUpload,
  register,
  uploadError,
  uploads,
  willPresentPaper
}: {
  copy: RegistrationCopy;
  dragging: boolean;
  errors: FieldErrors<InscricaoFormData>;
  onAddFiles: (fileList: FileList | null) => void;
  onDraggingChange: (value: boolean) => void;
  onRemoveUpload: (id: string) => void;
  register: UseFormRegister<InscricaoFormData>;
  uploadError?: string;
  uploads: UploadItem[];
  willPresentPaper: boolean;
}) {
  const fields = copy.fields;

  return (
    <FormSection className="academic-fieldset" title={fields.academic}>
      <RadioGroup
        error={errors.apresentaraTrabalho?.message}
        label={fields.paperQuestion}
        name="apresentaraTrabalho"
        options={copy.yesNo}
        register={register("apresentaraTrabalho", { required: copy.required })}
      />
      {willPresentPaper ? (
        <>
          <InlineLineField
            error={errors.tituloTrabalho?.message}
            label={fields.paperTitle}
            register={register("tituloTrabalho", { required: copy.required })}
          />
          <InlineLineField
            error={errors.areaTematica?.message}
            label={fields.thematicArea}
            register={register("areaTematica", { required: copy.required })}
          />
          <label
            className="dropzone"
            onDragEnter={() => onDraggingChange(true)}
            onDragLeave={() => onDraggingChange(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              onDraggingChange(false);
              onAddFiles(event.dataTransfer.files);
            }}
          >
            <input accept=".pdf" multiple onChange={(event) => onAddFiles(event.target.files)} type="file" />
            <span>{copy.fileButton}</span>
          </label>
          {uploadError ? <small className="upload-error">{uploadError}</small> : null}
          <div className="upload-list" aria-live={dragging ? "polite" : undefined}>
            {uploads.map((upload) => (
              <div className="upload-item" key={upload.id}>
                <div>
                  <span>{upload.file.name}</span>
                  <button
                    aria-label={`${copy.remove} ${upload.file.name}`}
                    onClick={() => onRemoveUpload(upload.id)}
                    type="button"
                  >
                    ×
                  </button>
                </div>
                <progress max={100} value={upload.progress} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </FormSection>
  );
}
