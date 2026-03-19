import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConcept } from '@features/concept/services/conceptService';
import type { CreateConceptPayload } from '@features/concept/types/createConcept';

export const useCreateConceptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConceptPayload) => createConcept(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['concepts'],
        exact: false,
      });
    },

    onError: (error: unknown) => {
      console.error('Create concept failed:', error);
    },
  });
};
