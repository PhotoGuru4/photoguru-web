import Modal from '@shared/components/common/Modal';
import { Input } from '@shared/components/common/Input';
import { Heading } from '@shared/components/common/Heading';
import { Text } from '@shared/components/common/Text';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import { useConceptCategoriesQuery } from '@features/concept/hooks/queries/useConceptCategoriesQuery';
import PackageForm from '@features/concept/components/PackageForm';
import PackageCard from '@features/concept/components/PackageCard';

import UploadBox from '@features/concept/components/UploadBox';
import ImagePreviewList from '@features/concept/components/ImagePreviewList';
import ActionButtons from '@features/concept/components/ActionButtons';

import { useCreateConceptModal } from '@features/concept/hooks/useCreateConceptModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateConceptModal = ({ open, onClose }: Props) => {
  const { data: categories = [] } = useConceptCategoriesQuery();

  const {
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
  } = useCreateConceptModal(onClose);

  const selectClass =
    'w-full px-4 py-1.5 text-sm border border-gray-300 rounded-md ' +
    'focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-400 ' +
    'bg-white appearance-none transition-all';

  return (
    <Modal open={open} onClose={onClose} title="Add New Concept" width="lg">
      <div className="space-y-6">
        {step === 1 && (
          <>
            <Input
              label="Title"
              value={form.name}
              placeholder="Enter concept title"
              onChange={(e) =>
                handleChangeForm('name', e.target.value)
              }
              inputSize="sm"
              error={errors?.name}
            />

            <div>
              <Text className="block mb-2" variant="caption">
                Category
              </Text>

              <div className="relative">
                <select
                  className={clsx(
                    selectClass,
                    !form.categoryId ? 'text-gray-400' : 'text-gray-700',
                    errors?.categoryId && 'border-red-500',
                  )}
                  value={form.categoryId || ''}
                  onChange={(e) =>
                    handleChangeForm(
                      'categoryId',
                      Number(e.target.value),
                    )
                  }
                >
                  <option value="" disabled hidden>
                    Choose concept category
                  </option>

                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {errors?.categoryId && (
                <Text variant="caption" className="text-red-500 mt-1">
                  {errors.categoryId}
                </Text>
              )}
            </div>

            <Input
              label="Description"
              value={form.description}
              placeholder="Enter concept description"
              onChange={(e) =>
                handleChangeForm('description', e.target.value)
              }
              inputSize="sm"
              error={errors?.description}
            />

            <UploadBox
              label="Upload Thumbnail"
              hint="only one image"
              onChange={handleThumbnailChange}
            />

            {errors?.thumbnail && (
              <Text variant="caption" className="text-red-500 -mt-3">
                {errors.thumbnail}
              </Text>
            )}

            <ImagePreviewList
              images={thumbnailPreview ? [thumbnailPreview] : []}
              onRemove={removeThumbnail}
              single
            />

            <UploadBox
              label="Upload Images"
              hint="multiple images allowed"
              multiple
              onChange={photos.addFiles}
            />

            {errors?.photos && (
              <Text variant="caption" className="text-red-500 -mt-3">
                {errors.photos}
              </Text>
            )}

            <ImagePreviewList
              images={photos.previews}
              onRemove={photos.removeFile}
            />

            <ActionButtons
              onCancel={onClose}
              onSubmit={handleContinue}
              submitText="Continue"
            />
          </>
        )}

        {step === 2 && (
          <>
            {form.packages.length < 3 && (
              <PackageForm
                onAdd={addPackage}
                existingPackages={form.packages}
              />
            )}

            {form.packages.length === 3 && (
              <Text className="text-sm text-gray-500">
                Maximum 3 packages reached
              </Text>
            )}

            {form.packages.length > 0 && (
              <div className="mt-6 space-y-3">
                <Heading level={6}>
                  Added Packages ({form.packages.length}/3)
                </Heading>

                {form.packages.map((p, i) => (
                  <PackageCard
                    key={i}
                    pkg={p}
                    onRemove={() => removePackage(i)}
                  />
                ))}
              </div>
            )}

            <ActionButtons
              onBack={goBack}
              onSubmit={handleSave}
              submitText="Save Concept"
              disabled={
                isPending ||
                    isUploading ||
                    form.packages.length === 0
              }
              loading={isPending || isUploading}
              showBack
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default CreateConceptModal;
