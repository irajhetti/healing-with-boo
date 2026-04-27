export type DaySchedule = {
  open: string; // "14:00" 24hr format
  close: string;
} | null; // null = closed

export const TIMEZONE = "Europe/London";
