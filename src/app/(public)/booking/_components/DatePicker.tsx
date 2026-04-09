"use client";

import { useMemo } from "react";

type Props = {
  availableDates: string[];
  selected: string | null;
  onSelect: (date: string) => void;
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({ availableDates, selected, onSelect }: Props) {
  // Determine which months to show based on available dates
  const monthsToShow = useMemo(() => {
    if (availableDates.length === 0) return [];

    const months = new Set<string>();
    for (const d of availableDates) {
      months.add(d.slice(0, 7)); // "YYYY-MM"
    }
    return Array.from(months).sort();
  }, [availableDates]);

  const availableSet = useMemo(() => new Set(availableDates), [availableDates]);

  if (monthsToShow.length === 0) {
    return (
      <p className="text-center text-on-surface-variant py-8">
        No available dates for this service.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {monthsToShow.map((ym) => {
        const [year, month] = ym.split("-").map(Number);
        const daysInMonth = getDaysInMonth(year, month - 1);
        const firstDay = getFirstDayOfMonth(year, month - 1);

        return (
          <div key={ym}>
            <h3 className="font-headline text-lg text-on-surface mb-4 text-center">
              {MONTH_NAMES[month - 1]} {year}
            </h3>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_HEADERS.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-label text-on-surface-variant py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isAvailable = availableSet.has(dateStr);
                const isSelected = selected === dateStr;

                return (
                  <button
                    key={day}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && onSelect(dateStr)}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all ${
                      isSelected
                        ? "bg-primary text-on-primary font-bold"
                        : isAvailable
                        ? "text-on-surface hover:bg-primary/10 cursor-pointer"
                        : "text-on-surface-variant/30 cursor-not-allowed"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
