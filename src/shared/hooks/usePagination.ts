import { useEffect, useState } from 'react';
import { PAGINATION } from '@shared/constants/pagination';

interface UsePaginationParams<T> {
  fetchFn: (params: { page: number; perPage: number }) => Promise<{
    items: T[];
    pagination: {
      page: number;
      perPage: number;
      totalPages: number;
      total: number;
    };
  }>;
  perPage?: number;
}

export const usePagination = <T>({
  fetchFn,
  perPage = PAGINATION.PAGE_OFFSET.PER_PAGE,
}: UsePaginationParams<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(PAGINATION.PAGE_OFFSET.PAGE);
  const [pagination, setPagination] = useState<{
    page: number;
    perPage: number;
    totalPages: number;
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchFn({ page, perPage });

        setItems(res.items);
        setPagination(res.pagination);
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, perPage]);

  return {
    items,
    page,
    setPage,
    pagination,
    loading,
    error,
  };
};
