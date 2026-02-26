import DashboardStats from '@features/dashboard/components/DashboardStats';
import { DashboardCalendar } from '@features/dashboard/components/DashboardCalendar';
import DashboardQuickActions from '@features/dashboard/components/DashboardQuickActions';

import {
  Heading,
  Loading,
  Text,
} from '@shared/components/common';

import { useDashboard } from '@features/dashboard/hooks/useDashboard';
import { DEFAULT_IMAGES } from '@shared/constants';

const Home = () => {
  const {
    summary,
    calendar,
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
    isSummaryLoading,
    isCalendarLoading,
    isError,
  } = useDashboard();

  if (isSummaryLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-10 py-8">
      <div className="flex flex-col gap-8">

        <div className="flex items-center gap-4">
          <img
            src={
              isError
                ? DEFAULT_IMAGES.DEFAULT_AVATAR
                : summary?.avatarUrl || DEFAULT_IMAGES.DEFAULT_AVATAR
            }
            alt="avatar"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <Heading level={4}>
              {isError ? 'Hi there' : `Hi ${summary?.greetingName}`}
            </Heading>
            <Text variant="caption" color="muted">
              Ready for a productive day?
            </Text>
          </div>
        </div>

        <DashboardStats
          today={isError ? 0 : summary?.earnings?.today}
          thisMonth={isError ? 0 : summary?.earnings?.thisMonth}
        />

        <DashboardCalendar
          schedules={isError ? [] : calendar?.schedules || []}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setCurrentMonth={setCurrentMonth}
          setCurrentYear={setCurrentYear}
          isLoading={isCalendarLoading}
        />

        <DashboardQuickActions />

      </div>
    </main>
  );
};

export default Home;
