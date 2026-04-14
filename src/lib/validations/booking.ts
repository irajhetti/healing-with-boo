import { z } from "zod";

export const bookingFormSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s+()-]+$/, "Please enter a valid phone number"),
  notes: z.string().optional(),
  discountCode: z.string().max(30).optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
