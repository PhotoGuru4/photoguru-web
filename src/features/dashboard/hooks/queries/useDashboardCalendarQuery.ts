import { useQuery } from '@tanstack/react-query';
import type { DashboardCalendarEvent } from '@features/dashboard/types/calendar';
import { getDashboardCalendar } from '@features/dashboard/services/dashboardService';

export const useDashboardCalendarQuery = (
  month: number,
  year: number,
) => {
  return useQuery<DashboardCalendarEvent>({
    queryKey: ['dashboardCalendar', month, year],
    queryFn: () => getDashboardCalendar(month, year),
    staleTime: 1000 * 60 * 5,
  });
};
