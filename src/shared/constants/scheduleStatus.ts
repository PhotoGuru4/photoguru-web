export const SCHEDULE_STATUS = {
  CONFIRMED: 'CONFIRMED',
  INPROGRESS: 'INPROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export type ScheduleStatus =
  (typeof SCHEDULE_STATUS)[keyof typeof SCHEDULE_STATUS]
