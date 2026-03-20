import { useState } from 'react';
import { uploadToCloudinary } from '@shared/utils/cloudinary';
import { useCreateConceptMutation } from '@features/concept/hooks/mutations/useCreateConceptMutation';
import type {
  CreateConceptPayload,
  ConceptPackage,
} from '@features/concept/types/createConcept';
import { useImageUpload } from '@features/concept/hooks/useImageUpload';
import { showError, showSuccess } from '@shared/utils/toast';
import { handleApiError } from '@shared/utils/error-handler';

export const useCreateConceptModal = (onClose: () => void) => {
  const { mutate, isPending } = useCreateConceptMutation();

  const [step, setStep] = useState<1 | 2>(1);

  const initialForm: CreateConceptPayload = {
    name: '',
    categoryId: 0,
    description: '',
    thumbnailUrl: '',
    photoUrls: [],
    packages: [],
  };

  const [form, setForm] = useState<CreateConceptPayload>(initialForm);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const photos = useImageUpload();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setStep(1);
    setThumbnailFile(null);
    setThumbnailPreview('');
    photos.clear();
    setIsUploading(false);
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Title is required';
    if (!form.categoryId) newErrors.categoryId = 'Category is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!thumbnailFile) newErrors.thumbnail = 'Thumbnail is required';
    if (photos.files.length === 0) newErrors.photos = 'At least one image is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showError('Invalid form', 'Please check required fields');
      return false;
    }

    return true;
  };

  const handleThumbnailChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));

    if (errors.thumbnail) {
      setErrors((prev) => ({ ...prev, thumbnail: '' }));
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleChangeForm = <K extends keyof CreateConceptPayload>(
    key: K,
    value: CreateConceptPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleContinue = () => {
    if (!validateStep1()) return;
    setStep(2);
  };

  const goBack = () => setStep(1);

  const addPackage = (pkg: ConceptPackage) => {
    setForm((prev) => {
      if (prev.packages.length >= 3) {
        showError('Limit reached', 'Maximum 3 packages allowed');
        return prev;
      }

      const isDuplicate = prev.packages.some((p) => p.tier === pkg.tier);

      if (isDuplicate) {
        showError('Duplicate package', 'This package type already exists');
        return prev;
      }

      return {
        ...prev,
        packages: [...prev.packages, pkg],
      };
    });
  };

  const removePackage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (form.packages.length === 0) {
      showError('Missing packages', 'Please add at least one package');
      return;
    }

    try {
      setIsUploading(true);

      const thumbnailUrl = await uploadToCloudinary(thumbnailFile!);

      const photoUrls: string[] = await Promise.all(
        photos.files.map((file: File) => uploadToCloudinary(file)),
      );

      const payload: CreateConceptPayload = {
        ...form,
        thumbnailUrl,
        photoUrls,
      };

      mutate(payload, {
        onSuccess: () => {
          showSuccess('Success', 'Concept created successfully');

          resetForm();

          onClose();
        },
        onError: (error: unknown) => {
          const message = handleApiError(error);
          showError('Create failed', message);
        },
      });
    } catch (error: unknown) {
      const message = handleApiError(error);
      showError('Upload failed', message);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    step,
    form,
    errors,
    isPending,
    isUploading,
    thumbnailPreview,
    photos,

    handleChangeForm,
    handleThumbnailChange,
    removeThumbnail,
    handleContinue,
    handleSave,
    addPackage,
    removePackage,
    goBack,
  };
};

export default useCreateConceptModal;
