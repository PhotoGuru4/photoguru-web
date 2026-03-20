import { GET, POST } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import type { ConceptResponse } from '@features/concept/types/concept';
import type { CreateConceptPayload } from '@features/concept/types/createConcept';
import type { Category } from '@features/concept/types/category';

export const getMyConcepts = (
  page: number,
  limit: number,
): Promise<ConceptResponse> => {
  return GET<ConceptResponse>(API_ENDPOINTS.CONCEPT.CONCEPTLIST, {
    params: { page, limit },
  });
};

export const getCategories = (): Promise<Category[]> => {
  return GET<Category[]>(API_ENDPOINTS.CONCEPT.CATEGORIES);
};

export const createConcept = (data: CreateConceptPayload) => {
  return POST(API_ENDPOINTS.CONCEPT.CREATECONCEPT, data);
};
