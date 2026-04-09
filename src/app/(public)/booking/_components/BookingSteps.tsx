const steps = ["Service", "Date", "Time", "Details"];

export function BookingSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isComplete = stepNum < current;

        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : isComplete
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {isComplete ? (
                  <span className="material-symbols-outlined text-[16px]">
                    check
                  </span>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`hidden sm:inline font-label text-xs uppercase tracking-wider ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 md:w-12 h-px ${
                  isComplete ? "bg-primary/40" : "bg-outline-variant"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
