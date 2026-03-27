import type { ConceptItem } from '@features/concept/types/concept';
import { formatDateVN } from '@shared/utils/formatDateVN';

export const mapConceptToCard = (item: ConceptItem) => {
  return {
    id: item.id,
    title: item.name,
    category: item.categoryName,
    date: formatDateVN(item.createdAt),
    packages: item.packagesCount,
    images: [
      item.thumbnailUrl,
      ...(item.photos || []),
    ],
  };
};
