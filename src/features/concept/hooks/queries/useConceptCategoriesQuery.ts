import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@features/concept/services/conceptService';

export const useConceptCategoriesQuery = () => {
  return useQuery({
    queryKey: ['concept-categories'],
    queryFn: getCategories,
  });
};
