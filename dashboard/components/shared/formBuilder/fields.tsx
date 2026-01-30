/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import DropFileZone, { PreviewFile } from "./dropZone";

//  COMMON TYPES
interface BaseFieldProps {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
}

//  1. INPUT (text, email, number, password)
interface InputFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  setValue?: UseFormSetValue<any>;
  watch?: UseFormWatch<any>;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  setValue,
}) => {
  const registration = register(name, {
    valueAsNumber: type === "number",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Transform slug: replace spaces with dashes
    if (name === "slug" && type === "text") {
      value = value.replace(/\s+/g, "-");
      e.target.value = value;
      if (setValue) {
        setValue(name, value, { shouldValidate: true });
      }
    }

    // Call the original onChange handler
    registration.onChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}
      <input
        type={type}
        {...registration}
        onChange={handleChange}
        placeholder={placeholder}
        className="border p-2 rounded border-secondary"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

//  2. TEXTAREA
interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium">{label}</label>}
    <textarea
      {...register(name)}
      placeholder={placeholder}
      className="border p-2 rounded border-secondary h-28"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  3. SELECT
interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps extends BaseFieldProps {
  options: Option[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  register,
  error,
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium">{label}</label>}
    <select {...register(name)} className="border p-2 rounded border-secondary">
      <option value="">Select...</option>
      {options.map((op) => (
        <option key={op.value} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  4. CHECKBOX
export const CheckboxField: React.FC<BaseFieldProps> = ({
  label,
  name,
  register,
  error,
}) => (
  <div className="flex items-center gap-2">
    <input type="checkbox" {...register(name)} />
    <label>{label}</label>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  5. RADIO GROUP
interface RadioFieldProps extends BaseFieldProps {
  options: Option[];
}

export const RadioField: React.FC<RadioFieldProps> = ({
  label,
  name,
  options,
  register,
  error,
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium">{label}</label>}
    <div className="flex gap-4">
      {options.map((op) => (
        <label key={op.value} className="flex items-center gap-1">
          <input type="radio" value={op.value} {...register(name)} />
          {op.label}
        </label>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  6. DATE INPUT
export const DateField: React.FC<BaseFieldProps> = ({
  label,
  name,
  register,
  error,
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium">{label}</label>}
    <input
      type="date"
      {...register(name)}
      className="border p-2 rounded border-secondary"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  7. FILE UPLOAD (with preview)

//  COMMON TYPES
interface BaseFieldProps {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>; // <--- Add this type
  error?: string;
}

// ... (Input, Textarea, Select, Checkbox, Radio, Date remain the same) ...
// (I am omitting them for brevity, assume they are unchanged from your code)

//  7. FILE UPLOAD (with preview)
//  Updated to be compatible with react-hook-form via setValue
export const FileField: React.FC<
  BaseFieldProps & {
    watch: UseFormWatch<any>;
    accept?: any;
    maxFiles?: number;
  } & {
    multiple?: boolean;
  }
> = ({ name, watch, setValue, error, accept, maxFiles, multiple, label }) => {
  // 1. Get current files from form state
  const files = watch(name);

  // 2. Handler to update form state when files change in Dropzone
  const handleFilesChange = (newFiles: PreviewFile[]) => {
    if (setValue) {
      setValue(name, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}

      <DropFileZone
        value={files} // Pass current files
        onChange={handleFilesChange} // Pass updater
        maxFiles={maxFiles}
        accept={accept}
        multiple={multiple}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

//  8. MULTI SELECT
export const MultiSelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  register,
  error,
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium">{label}</label>}
    <select
      {...register(name)}
      multiple
      size={options.length}
      className="border p-2 rounded border-secondary"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  9. TOGGLE SWITCH
export const ToggleField: React.FC<BaseFieldProps> = ({
  label,
  name,
  register,
  error,
}) => (
  <div className="flex items-center gap-2">
    <label className="font-medium">{label}</label>
    <input
      type="checkbox"
      {...register(name)}
      className="w-10 h-5 rounded border-secondary-full cursor-pointer"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  10. COLOR PICKER
export const ColorField: React.FC<BaseFieldProps> = ({
  label,
  name,
  register,
  error,
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="font-medium">{label}</label>}
    <input type="color" {...register(name)} className="w-16 h-10 p-0" />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

//  11. FILE DROPZONE

//  EXPORT REGISTRY FOR FORM BUILDER
export const FIELD_COMPONENTS = {
  text: InputField,
  email: InputField,
  password: InputField,
  number: InputField,
  textarea: TextareaField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  date: DateField,
  file: FileField,
  multiselect: MultiSelectField,
  toggle: ToggleField,
  color: ColorField,
};

export enum FieldType {
  text = "text",
  email = "email",
  password = "password",
  number = "number",
  textarea = "textarea",
  select = "select",
  checkbox = "checkbox",
  radio = "radio",
  date = "date",
  file = "file",
  multiselect = "multiselect",
  toggle = "toggle",
  color = "color",
  fileDropzone = "fileDropzone",
}
