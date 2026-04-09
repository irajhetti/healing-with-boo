import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().max(30).optional().or(z.literal("")),
  pressurePref: z.enum(["Light", "Medium", "Firm", "Extra Firm"]),
  healthNotes: z.string().max(2000).optional().or(z.literal("")),
});
