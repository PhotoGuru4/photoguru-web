import { useState } from 'react';
import { useDashboardCalendarQuery } from '@features/dashboard/hooks/queries/useDashboardCalendarQuery';
import { useDashboardSummaryQuery } from '@features/dashboard/hooks/queries/useDashboardSummaryQuery';

export const useDashboard = () => {
  const now = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    now.getMonth() + 1,
  );
  const [currentYear, setCurrentYear] = useState(
    now.getFullYear(),
  );

  const summaryQuery = useDashboardSummaryQuery();

  const calendarQuery = useDashboardCalendarQuery(
    currentMonth,
    currentYear,
  );

  return {
    summary: summaryQuery.data,
    calendar: calendarQuery.data,

    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,

    isSummaryLoading: summaryQuery.isLoading,
    isCalendarLoading: calendarQuery.isFetching,

    isError: summaryQuery.isError || calendarQuery.isError,
  };
};
