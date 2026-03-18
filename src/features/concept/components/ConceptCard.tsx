import { Heading, Text, Button } from '@shared/components/common';
import Badge from '@shared/components/common/Badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_IMAGES } from '@shared/constants';
import { getSafeImage } from '@shared/utils/safeImage';
import { useImageSlider } from '@features/concept/hooks/useImageSlider';
import { formatDateVN } from '@shared/utils/formatDateVN';

interface ConceptCardProps {
  title: string;
  category: string;
  date: string;
  packages: number;
  images: string[];
}

const ConceptCard = ({
  title,
  category,
  date,
  packages,
  images,
}: ConceptCardProps) => {

  const {
    current,
    handleNext,
    handlePrev,
    handleStart,
    handleEnd,
  } = useImageSlider(images.length);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
      <div
        className="relative h-40 w-full overflow-hidden"
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={(e) => handleEnd(e.clientX)}
        onMouseLeave={(e) => handleEnd(e.clientX)}
      >
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={getSafeImage(img, DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE)}
              onError={(e) => {
                e.currentTarget.src =
                  DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE;
              }}
              alt={title}
              className="w-full rounded-xl h-40 object-cover shrink-0 p-1.5"
            />
          ))}
        </div>

        <Button
          onClick={handlePrev}
          unstyled
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        >
          <ChevronLeft size={16} />
        </Button>

        <Button
          onClick={handleNext}
          unstyled
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        >
          <ChevronRight size={16} />
        </Button>

        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
          {current + 1}/{images.length}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <Heading level={5}>{title}</Heading>

        <div className="flex items-center justify-between">
          <Badge label={category} color="pink" size="sm" />
          <Text lineClamp={1} variant="caption" color="muted">
            {formatDateVN(date)}
          </Text>
        </div>

        <div className="flex items-center justify-center border border-gray-200 rounded-lg py-2 text-sm text-gray-600">
          Packages ({packages})
        </div>
      </div>
    </div>
  );
};

export default ConceptCard;
