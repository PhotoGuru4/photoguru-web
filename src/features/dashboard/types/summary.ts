export interface DashboardEarnings {
  today?: number;
  thisMonth?: number;
}

export interface DashboardSummary {
  earnings: DashboardEarnings;
  greetingName: string;
  avatarUrl: string;
}
