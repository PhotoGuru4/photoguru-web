import { useMemo, useState } from 'react';
import { useConceptsQuery } from '@features/concept/hooks/queries/useConceptsQuery';
import { mapConceptToCard } from '@shared/utils/mapConcept';
import { PAGINATION } from '@shared/constants';

const LIMIT = PAGINATION.PAGE_OFFSET.PER_PAGE;

export const useConcepts = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useConceptsQuery(page, LIMIT);

  const stats = data?.stats;
  const meta = data?.meta;

  const mappedConcepts = useMemo(() => {
    const items = data?.items ?? [];
    return items.map(mapConceptToCard);
  }, [data]);

  return {
    concepts: mappedConcepts,
    stats,

    page: meta?.page ?? page,
    totalPages: meta?.totalPages ?? 1,

    isLoading,
    isError,

    setPage,
  };
};
