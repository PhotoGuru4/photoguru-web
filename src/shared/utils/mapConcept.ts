import type { ConceptItem } from '@features/concept/types/concept';

export const mapConceptToCard = (item: ConceptItem) => {
  return {
    id: item.id,
    title: item.name,
    category: item.categoryName,
    date: new Date(item.createdAt).toLocaleDateString(),
    packages: item.packagesCount,
    images: [
      item.thumbnailUrl,
      ...(item.photos || []),
    ],
  };
};
