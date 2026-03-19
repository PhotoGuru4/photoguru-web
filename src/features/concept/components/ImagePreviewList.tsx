import clsx from 'clsx';
import { Button } from '@shared/components/common/Button';
import { X } from 'lucide-react';

interface Props {
  images: string[];
  onRemove: (index: number) => void;
  single?: boolean;
}

const ImagePreviewList = ({ images, onRemove, single }: Props) => {
  if (images.length === 0) return null;

  return (
    <div
      className={clsx(
        'mt-2',
        single
          ? 'relative w-fit group'
          : 'overflow-x-auto px-2 py-2',
      )}
    >
      <div className={clsx(single ? '' : 'flex gap-2')}>
        {images.map((src, i) => (
          <div key={i} className="relative shrink-0 group">
            <img
              src={src}
              className="w-24 h-24 object-cover rounded-lg border"
            />

            <Button
              type="button"
              onClick={() => onRemove(i)}
              unstyled
              className="absolute -top-2 -right-2 w-5 h-5 bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <X size={12} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewList;
