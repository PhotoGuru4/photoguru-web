import { SCHEDULE_STATUS } from '@shared/constants/scheduleStatus';

export interface Schedule {
  id: number;
  title: string;
  date: string;
  estimatedDuration: number;
  status: typeof SCHEDULE_STATUS[keyof typeof SCHEDULE_STATUS];
  totalPrice: number;
  clientName: string;
  clientAvatar: string;
  conceptName: string;
}

export interface DashboardCalendarEvent {
    month: number;
    year: number;
    schedules: Schedule[];
}
