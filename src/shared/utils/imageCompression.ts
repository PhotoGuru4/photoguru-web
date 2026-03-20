import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File) => {
  return await imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
  });
};
