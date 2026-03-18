import { GET } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import type { ConceptResponse } from '@features/concept/types/concept';

export const getMyConcepts = (
  page: number,
  limit: number,
): Promise<ConceptResponse> => {
  return GET<ConceptResponse>(API_ENDPOINTS.CONCEPT.CONCEPTLIST, {
    params: { page, limit },
  });
};
