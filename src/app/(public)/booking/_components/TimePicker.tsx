"use client";

type Props = {
  slots: string[];
  selected: string | null;
  onSelect: (time: string) => void;
  loading: boolean;
};

function formatSlotTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
}

export function TimePicker({ slots, selected, onSelect, loading }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="text-center text-on-surface-variant py-8">
        No available time slots for this date. Please try another day.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
      {slots.map((slot) => {
        const isSelected = selected === slot;
        return (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`py-3 px-2 rounded-lg text-sm font-label font-medium transition-all ${
              isSelected
                ? "bg-primary text-on-primary shadow-[0_0_15px_-3px] shadow-primary/30"
                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
            }`}
          >
            {formatSlotTime(slot)}
          </button>
        );
      })}
    </div>
  );
}
