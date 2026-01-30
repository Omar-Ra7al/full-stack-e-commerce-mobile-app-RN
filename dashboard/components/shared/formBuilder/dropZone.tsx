"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDropzone, FileWithPath, FileRejection } from "react-dropzone";

export type PreviewFile = FileWithPath & { preview: string };

interface DropFileZoneProps {
  accept?: { [key: string]: string[] };
  maxFiles?: number;
  value?: PreviewFile[];
  multiple?: boolean;
  onChange?: (files: PreviewFile[]) => void;
}

const DropFileZone: React.FC<DropFileZoneProps> = ({
  accept = { "image/*": [] },
  maxFiles = 5,
  value = [],
  multiple = false,
  onChange,
}) => {
  const [error, setError] = React.useState("");

  const modifedValue = useMemo(() => {
    return Array.isArray(value) ? value : ([value] as PreviewFile[]);
  }, [value]);

  // console.log("modifedValue", modifedValue);
  useEffect(() => {
    // Cleanup previews to avoid memory leaks
    return () => {
      modifedValue?.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [modifedValue]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setError("");
      // When multiple=false, we're replacing the file, so skip length check
      // When multiple=true, check if adding new files would exceed maxFiles
      if (multiple && value.length + acceptedFiles.length > maxFiles) {
        setError(`You can only select up to ${maxFiles} files.`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as PreviewFile[];

      const finalFiles = multiple
        ? [...value, ...newFiles]
        : newFiles.slice(0, 1);

      onChange?.(finalFiles);
    },
    [value, maxFiles, multiple, onChange]
  );

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    const messages = rejectedFiles.map(
      (f) => `${f.file.name}: ${f.errors.map((e) => e.message).join(", ")}`
    );
    setError(messages.join("; "));
  }, []);

  const removeFile = (fileToRemove: PreviewFile) => {
    onChange?.(modifedValue.filter((f) => f !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    multiple,
    // When multiple=false, allow 1 file (replacement). When multiple=true, limit by remaining slots
    maxFiles: multiple ? maxFiles - (value?.length || 0) : 1,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`bg-transparent border-2 border-secondary border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-300 ${
          isDragActive
            ? "bg-blue-100 border-blue-400"
            : "bg-gray-50 border-gray-300"
        } hover:bg-blue-50`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-700 text-lg">
          {isDragActive
            ? "Drop the files here..."
            : `Drag 'n' drop files here, or click to select (max ${maxFiles})`}
        </p>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {modifedValue.length > 0 && (
        <div className="flex flex-wrap items-center gap-4">
          {modifedValue.map((file, idx) => {
            // If the file has a URL, use it, otherwise use the preview
            const imageSrc = "url" in file ? file.url : file.preview;

            return (
              <div key={idx} className="relative">
                <Image
                  width={200}
                  height={200}
                  src={imageSrc as string}
                  alt={`Preview ${idx}`}
                  className="w-full h-32 object-cover rounded"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white rounded-tr-md w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropFileZone;
