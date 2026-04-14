import { z } from "zod";

export const discountCodeSchema = z
  .object({
    code: z
      .string()
      .min(2, "Code must be at least 2 characters")
      .max(30)
      .transform((v) => v.toUpperCase().replace(/\s/g, "")),
    discountType: z.enum(["PERCENTAGE", "FIXED"]),
    amount: z.number().int().positive("Amount must be positive"),
    maxUses: z.number().int().positive().nullable(),
    expiresAt: z.string().nullable(), // ISO date string or null
    userId: z.string().nullable(), // null = general, cuid = personal
  })
  .refine(
    (data) => {
      if (data.discountType === "PERCENTAGE") {
        return data.amount >= 1 && data.amount <= 100;
      }
      return true;
    },
    { message: "Percentage must be between 1 and 100", path: ["amount"] }
  );
