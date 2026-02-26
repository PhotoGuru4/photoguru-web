import { useQuery } from '@tanstack/react-query';
import type { DashboardSummary } from '@features/dashboard/types/summary';
import { getDashboardSummary } from '@features/dashboard/services/dashboardService';

export const useDashboardSummaryQuery = () => {
  return useQuery<DashboardSummary>({
    queryKey: ['dashboardSummary'],
    queryFn: () => getDashboardSummary(),
    staleTime: 1000 * 60 * 5,
  });
};
