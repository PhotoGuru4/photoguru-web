import { useQuery } from '@tanstack/react-query';
import { getMyConcepts } from '@features/concept/services/conceptService';
import type { ConceptResponse } from '@features/concept/types/concept';

export const useConceptsQuery = (page: number, limit: number) => {
  return useQuery<ConceptResponse>({
    queryKey: ['concepts', page, limit],
    queryFn: () => getMyConcepts(page, limit),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};
