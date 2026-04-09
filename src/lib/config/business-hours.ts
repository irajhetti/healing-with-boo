export type DaySchedule = {
  open: string; // "14:00" 24hr format
  close: string;
} | null; // null = closed

export const BUFFER_MINUTES = 15;
export const SLOT_INCREMENT_MINUTES = 15;
export const CANCELLATION_HOURS = 24;
export const BOOKING_HORIZON_DAYS = 60;
export const TIMEZONE = "Europe/London";
