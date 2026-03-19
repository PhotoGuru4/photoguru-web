import { useState } from 'react';

export const useImageUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const arr = Array.from(fileList);

    setFiles((prev) => [...prev, ...arr]);
    setPreviews((prev) => [
      ...prev,
      ...arr.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => {
    setFiles([]);
    setPreviews([]);
  };

  return {
    files,
    previews,
    addFiles,
    removeFile,
    clear,
  };
};
