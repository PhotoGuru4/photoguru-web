import { GET } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import type { DashboardSummary } from '@features/dashboard/types/summary';
import type { DashboardCalendarEvent } from '@features/dashboard/types/calendar';

export const getDashboardSummary = (): Promise<DashboardSummary> => {
  return GET<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY);
};

export const getDashboardCalendar = (
  month: number,
  year: number,
): Promise<DashboardCalendarEvent> => {
  return GET<DashboardCalendarEvent>(
    `${API_ENDPOINTS.DASHBOARD.CALENDAR}?month=${month}&year=${year}`,
  );
};
