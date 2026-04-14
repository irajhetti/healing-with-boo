import type { ServiceWithCategory, DiscountValidationResult } from "@/app/(public)/booking/actions";
import { formatPrice, formatDuration } from "@/lib/utils";

type Props = {
  service: ServiceWithCategory | null;
  date: string | null;
  time: string | null;
  discountResult?: DiscountValidationResult | null;
};

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00Z");
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatSlotTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
}

export function BookingSummary({ service, date, time, discountResult }: Props) {
  if (!service) return null;

  const hasDiscount = discountResult?.valid && discountResult.savedAmount! > 0;

  return (
    <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20">
      <h3 className="font-label font-medium text-on-surface mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[20px]">
          receipt_long
        </span>
        Booking Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-on-surface-variant">Service</span>
          <span className="font-medium text-on-surface text-right">
            {service.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-on-surface-variant">Duration</span>
          <span className="font-medium text-on-surface">
            {formatDuration(service.duration)}
          </span>
        </div>

        {date && (
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Date</span>
            <span className="font-medium text-on-surface">
              {formatDisplayDate(date)}
            </span>
          </div>
        )}

        {time && (
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Time</span>
            <span className="font-medium text-on-surface">
              {formatSlotTime(time)}
            </span>
          </div>
        )}

        <div className="border-t border-outline-variant/30 pt-3 space-y-2">
          {hasDiscount && (
            <>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-on-surface-variant line-through text-sm">
                  {formatPrice(service.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">
                  {discountResult!.code}
                </span>
                <span className="text-green-600 text-sm font-medium">
                  −{formatPrice(discountResult!.savedAmount!)}
                </span>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <span className="font-medium text-on-surface">Total</span>
            <span className="font-headline text-xl text-primary">
              {formatPrice(hasDiscount ? discountResult!.finalPrice! : service.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
