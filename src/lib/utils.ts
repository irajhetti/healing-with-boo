import { TIMEZONE } from "@/lib/config/business-hours";

export function generateReference(): string {
  const now = new Date();
  const yy = now.getFullYear().toString().slice(-2);
  const mm = (now.getMonth() + 1).toString().padStart(2, "0");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `HWB-${yy}${mm}-${suffix}`;
}

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(pence % 100 === 0 ? 0 : 2)}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIMEZONE,
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIMEZONE,
  }).format(date);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  return `${hrs} hr ${mins} min`;
}
