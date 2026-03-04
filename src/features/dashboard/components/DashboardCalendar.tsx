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
  schedules: Schedule[];
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
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

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const scheduleMap = new Map<string, Schedule[]>();

  schedules.forEach((s) => {
    const d = new Date(s.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    if (!scheduleMap.has(key)) {
      scheduleMap.set(key, []);
    }

    scheduleMap.get(key)!.push(s);
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

  for (let i = 0; i < firstDay; i++) currentWeek.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
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

                const daySchedules =
                  day !== null
                    ? scheduleMap.get(
                      `${currentYear}-${currentMonth}-${day}`,
                    ) || []
                    : [];

                const count = daySchedules.length;
                const singleStatus =
                  count === 1 ? daySchedules[0].status : null;

                return (
                  <td key={dayIdx} className="text-center align-middle">
                    {day !== null && (
                      <span
                        className={clsx(
                          'relative flex h-10 w-10 items-center justify-center rounded-full mx-auto transition-all',
                          count === 1 &&
                            singleStatus ===
                              SCHEDULE_STATUS.CONFIRMED &&
                            'bg-yellow-100 text-yellow-600 font-semibold',
                          count === 1 &&
                            singleStatus ===
                              SCHEDULE_STATUS.INPROGRESS &&
                            'bg-pink-100 text-pink-600 font-semibold',
                          count === 1 &&
                            singleStatus ===
                              SCHEDULE_STATUS.COMPLETED &&
                            'bg-green-100 text-green-600 font-semibold',
                          count > 1 &&
                            'bg-purple-100 text-purple-600 font-semibold',
                          isToday &&
                            count === 0 &&
                            'border-2 border-pink-500 font-semibold',
                          count === 0 &&
                            !isToday &&
                            'text-gray-700',
                        )}
                      >
                        {count > 1 && (
                          <div className="absolute -bottom-3 flex gap-1">
                            {daySchedules.map((s, index) => (
                              <span
                                key={`${s.id}-${index}`}
                                className={clsx(
                                  'h-1.5 w-1.5 rounded-full',
                                  s.status ===
                                    SCHEDULE_STATUS.CONFIRMED &&
                                    'bg-yellow-200',
                                  s.status ===
                                    SCHEDULE_STATUS.INPROGRESS &&
                                    'bg-pink-200',
                                  s.status ===
                                    SCHEDULE_STATUS.COMPLETED &&
                                    'bg-green-200',
                                )}
                              />
                            ))}
                          </div>
                        )}

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

      <div className="mt-6 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-yellow-200" />
          <Text variant="caption">Pending</Text>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-pink-200" />
          <Text variant="caption">In Progress</Text>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-200" />
          <Text variant="caption">Completed</Text>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-purple-200" />
          <Text variant="caption">Multiple Schedules</Text>
        </div>
      </div>
    </div>
  );
};
