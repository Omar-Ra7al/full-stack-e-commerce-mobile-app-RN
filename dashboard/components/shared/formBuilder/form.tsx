/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FIELD_COMPONENTS } from "./fields";
import { Loader } from "lucide-react";

type FormBuilderProps<T extends Record<string, any>> = {
  schema: ZodObject<ZodRawShape>;
  onSubmit: (data: any) => void;
  onChange?: (data: Partial<T>) => void;
  defaultValues?: Partial<T>;
  onLoad?: boolean;
  submitButtonText?: string;
  submittingButtonText?: string;
};

export function FormBuilder<T extends Record<string, any>>({
  schema,
  onSubmit,
  onChange,
  defaultValues = {},
  submitButtonText,
  submittingButtonText,
}: FormBuilderProps<T>) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!onChange) return;

    const subscription = watch((value) => {
      onChange(value); // live form data
    });

    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const submitHandler = async (data: any): Promise<void> => {
    setLoading(true);

    const updatedFields: Partial<T> = {};

    Object.keys(dirtyFields).forEach((key) => {
      (updatedFields as any)[key] = data[key];
    });

    if (onChange)
      onChange(Object.keys(defaultValues).length > 0 ? updatedFields : data);

    try {
      await onSubmit(
        Object.keys(defaultValues).length > 0 ? updatedFields : data,
      );
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4 w-full mx-auto"
    >
      {Object.entries(schema.shape).map(([fieldName, fieldSchema]) => {
        const meta: any = (fieldSchema as any).meta() || {};

        const Component =
          FIELD_COMPONENTS[meta.type as keyof typeof FIELD_COMPONENTS] ||
          FIELD_COMPONENTS.text;

        return (
          <Component
            key={fieldName}
            name={fieldName}
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors[fieldName]?.message as string}
            label={meta.label}
            placeholder={meta.placeholder}
            options={meta.options}
            type={meta.type}
            required={meta.required}
            accept={meta.accept}
            maxFiles={meta.maxFiles}
            multiple={meta.multiple}
            {...meta}
          />
        );
      })}

      <button
        type="submit"
        className={`flex items-center justify-center gap-2 bg-primary text-main uppercase p-2 rounded mt-4 hover:bg-primary/80 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed`}
        disabled={loading}
      >
        {loading ? (
          <>
            {submittingButtonText || "submitting"}
            <Loader className="animate-spin" />
          </>
        ) : (
          submitButtonText || "submit"
        )}
      </button>
    </form>
  );
}
