import type { ConceptChatCard } from '@features/chat/types/conceptCard';
import { formatPriceRange } from '@shared/utils/formatPriceRange';
import { Heading } from '@shared/components/common/Heading';
import { Text } from '@shared/components/common/Text';
import { DEFAULT_IMAGES } from '@shared/constants';
import { getSafeImage } from '@shared/utils/safeImage';

interface Props {
  concept: ConceptChatCard;
}

const ConceptCardMessage = ({ concept }: Props) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm max-w-md overflow-hidden">
      <div className="w-full bg-gray-50">
        <img
          src={getSafeImage(
            concept.thumbnailUrl,
            DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE,
          )}
          onError={(e) => {
            e.currentTarget.src =
              DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE;
          }}
          alt={concept.name}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <Heading level={5} truncate>
          {concept.name}
        </Heading>

        <Text variant="caption" color="muted" lineClamp={2}>
          {concept.description}
        </Text>

        <Text
          variant="body"
          color="pink"
          className="font-semibold"
        >
          {formatPriceRange(concept.minPrice, concept.maxPrice)}
        </Text>
      </div>
    </div>
  );
};

export default ConceptCardMessage;
