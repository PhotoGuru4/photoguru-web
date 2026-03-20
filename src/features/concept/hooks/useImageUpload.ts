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
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });

    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));

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
