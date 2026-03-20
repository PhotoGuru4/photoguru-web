import { compressImage } from '@shared/utils/imageCompression';
import { uploadToCloudinary } from '@shared/utils/cloudinary';

const compressFiles = async (files: File[]) => {
  return await Promise.all(files.map((file) => compressImage(file)));
};

const uploadInBatches = async (files: File[], batchSize = 2) => {
  const results: string[] = [];

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);

    const urls = await Promise.all(
      batch.map((file) => uploadToCloudinary(file)),
    );

    results.push(...urls);
  }

  return results;
};

export const uploadImagesService = async (params: {
  thumbnail: File;
  photos: File[];
}) => {
  const compressedThumbnail = await compressImage(params.thumbnail);
  const compressedPhotos = await compressFiles(params.photos);

  const thumbnailUrl = await uploadToCloudinary(compressedThumbnail);
  const photoUrls = await uploadInBatches(compressedPhotos);

  return {
    thumbnailUrl,
    photoUrls,
  };
};
