import { z } from "zod";

export const questionSchema = z.object({
  label: z.string().min(1, "Question text is required").max(500),
  type: z.enum(["SHORT_TEXT", "LONG_TEXT", "DROPDOWN", "YES_NO"]),
  options: z.string().max(2000).optional(), // comma-separated, only for DROPDOWN
  required: z.boolean(),
});
