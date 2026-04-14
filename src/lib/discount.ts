import type { DiscountType } from "@prisma/client";

export function calculateDiscountedPrice(
  originalPrice: number,
  discountType: DiscountType,
  amount: number
): { finalPrice: number; savedAmount: number } {
  // No discount on services already at minimum
  if (originalPrice <= 100) {
    return { finalPrice: originalPrice, savedAmount: 0 };
  }

  let saved: number;
  if (discountType === "PERCENTAGE") {
    saved = Math.floor((originalPrice * amount) / 100);
  } else {
    saved = amount;
  }

  // Enforce £1 minimum
  const finalPrice = Math.max(100, originalPrice - saved);
  // Recalculate saved after clamping
  saved = originalPrice - finalPrice;

  return { finalPrice, savedAmount: saved };
}
