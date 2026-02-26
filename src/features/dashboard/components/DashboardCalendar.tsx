import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import clsx from 'clsx';

import type { Schedule } from '@features/dashboard/types/calendar';
import { SCHEDULE_STATUS } from '@shared/constants/scheduleStatus';

import { Text, Heading, Button } from '@shared/components/common';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month - 1, 1).getDay();

const getMonthName = (year: number, month: number) =>
  new Date(year, month - 1, 1).toLocaleString('en-US', {
    month: 'long',
  });

interface Props {
  schedules: Schedule[]
  currentMonth: number
  currentYear: number
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
}

export const DashboardCalendar = ({
  schedules,
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}: Props) => {
  const now = new Date();

  const todayDate = now.getDate();
  const todayMonth = now.getMonth() + 1;
  const todayYear = now.getFullYear();

  const daysInMonth = getDaysInMonth(
    currentYear,
    currentMonth,
  );
  const firstDay = getFirstDayOfMonth(
    currentYear,
    currentMonth,
  );

  const scheduleMap = new Map<string, string>();

  schedules.forEach((s) => {
    const d = new Date(s.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    scheduleMap.set(key, s.status);
  });

  const handlePrev = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++)
    currentWeek.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7)
      currentWeek.push(null);
    weeks.push(currentWeek);
  }

  while (weeks.length < 6) {
    weeks.push(new Array(7).fill(null));
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <Heading level={4}>
          {getMonthName(currentYear, currentMonth)} {currentYear}
        </Heading>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<ChevronLeftIcon className="size-4" />}
            onClick={handlePrev}
          >
            <Text variant="caption">Prev</Text>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<ChevronRightIcon className="size-4" />}
            iconPosition="suffix"
            onClick={handleNext}
          >
            <Text variant="caption">Next</Text>
          </Button>
        </div>
      </div>

      <table className="w-full table-fixed">
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th key={day} className="py-3 text-center">
                <Text variant="caption" color="muted">
                  {day}
                </Text>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week, weekIdx) => (
            <tr key={weekIdx} className="h-16">
              {week.map((day, dayIdx) => {
                const isToday =
                  day === todayDate &&
                  currentMonth === todayMonth &&
                  currentYear === todayYear;

                const scheduleStatus =
                  day !== null
                    ? scheduleMap.get(
                      `${currentYear}-${currentMonth}-${day}`,
                    )
                    : null;

                return (
                  <td key={dayIdx} className="text-center align-middle">
                    {day !== null && (
                      <span
                        className={clsx(
                          'flex h-10 w-10 items-center justify-center rounded-full mx-auto transition-all',
                          scheduleStatus === SCHEDULE_STATUS.COMPLETED &&
                            'bg-green-100 text-green-600 font-semibold',
                          scheduleStatus === SCHEDULE_STATUS.CONFIRMED &&
                            'bg-yellow-100 text-yellow-600 font-semibold',
                          scheduleStatus === SCHEDULE_STATUS.INPROGRESS &&
                            'bg-pink-100 text-pink-600 font-semibold',
                          isToday &&
                            !scheduleStatus &&
                            'border-2 border-pink-500 font-semibold',
                          !scheduleStatus &&
                            !isToday &&
                            'text-gray-700',
                        )}
                      >
                        <Text as="span" variant="body">
                          {day}
                        </Text>
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
