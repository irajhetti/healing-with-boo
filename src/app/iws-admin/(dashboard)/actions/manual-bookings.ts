"use server";

import { revalidatePath } from "next/cache";
import { randomBytes, createHash } from "node:crypto";
import { z } from "zod";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { getAvailableSlots } from "@/lib/availability";
import { londonTimeToUTC, addDays } from "@/lib/time";
import { generateReference } from "@/lib/utils";

const PASSWORD_SETUP_TTL_MINUTES = 60 * 24 * 7; // 7 days for first-time password setup

const clientSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
});

const singleBookingSchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  client: clientSchema,
  linkUserId: z.string().optional().or(z.literal("")),
  priceOverride: z.number().int().min(0).max(100000).optional(),
  notes: z.string().max(1000).optional().or(z.literal("")),
  sendEmail: z.boolean().default(true),
});

const recurringSchema = singleBookingSchema.extend({
  frequency: z.enum(["WEEKLY", "FORTNIGHTLY", "MONTHLY"]),
  occurrences: z.number().int().min(1).max(26),
});

export type ClientSearchResult = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  bookingsCount: number;
};

/** Search existing User records by name or email. Admin-only. */
export async function searchClients(query: string): Promise<ClientSearchResult[]> {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const q = query.trim();
  if (q.length < 2) return [];

  const prisma = getPrisma();
  const users = await prisma.user.findMany({
    where: {
      role: "CLIENT",
      OR: [
        { email: { contains: q, mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
      ],
    },
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      _count: { select: { bookings: true } },
    },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    bookingsCount: u._count.bookings,
  }));
}

type ManualBookingInput = z.infer<typeof singleBookingSchema>;

type ManualBookingResult =
  | { ok: true; reference: string; clientCreated: boolean; setupLink: string | null }
  | { ok: false; error: string };

/** Create a single admin-entered booking. Optionally creates a lite User account. */
export async function createAdminBooking(
  input: ManualBookingInput,
): Promise<ManualBookingResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };

  const parsed = singleBookingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const result = await createOne(parsed.data);
  if (result.ok) {
    revalidatePath("/iws-admin/bookings");
    revalidatePath("/iws-admin");
  }
  return result;
}

type RecurringBookingResult = {
  ok: boolean;
  created: Array<{ date: string; reference: string }>;
  skipped: Array<{ date: string; reason: string }>;
  clientCreated: boolean;
  setupLink: string | null;
};

/** Create N bookings on a recurring schedule. Skips conflicts, returns summary. */
export async function createRecurringAdminBookings(
  input: z.infer<typeof recurringSchema>,
): Promise<RecurringBookingResult> {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = recurringSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      created: [],
      skipped: [{ date: input.date, reason: parsed.error.issues[0].message }],
      clientCreated: false,
      setupLink: null,
    };
  }

  const dates = expandDates(parsed.data.date, parsed.data.frequency, parsed.data.occurrences);

  const created: Array<{ date: string; reference: string }> = [];
  const skipped: Array<{ date: string; reason: string }> = [];
  let clientCreated = false;
  let setupLink: string | null = null;

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const result = await createOne({
      ...parsed.data,
      date,
      // Only the first booking creates the client / sends the email
      sendEmail: i === 0 ? parsed.data.sendEmail : false,
    });

    if (result.ok) {
      created.push({ date, reference: result.reference });
      if (i === 0) {
        clientCreated = result.clientCreated;
        setupLink = result.setupLink;
      }
    } else {
      skipped.push({ date, reason: result.error });
    }
  }

  revalidatePath("/iws-admin/bookings");
  revalidatePath("/iws-admin");

  return { ok: created.length > 0, created, skipped, clientCreated, setupLink };
}

// ── Internal helpers ──────────────────────────────────────────────────────

function expandDates(
  startDate: string,
  frequency: "WEEKLY" | "FORTNIGHTLY" | "MONTHLY",
  occurrences: number,
): string[] {
  const stride = frequency === "WEEKLY" ? 7 : frequency === "FORTNIGHTLY" ? 14 : 0;
  const dates: string[] = [];
  if (frequency === "MONTHLY") {
    const [y, m, d] = startDate.split("-").map(Number);
    for (let i = 0; i < occurrences; i++) {
      // Compute target year/month explicitly so day-of-month doesn't overflow
      // (e.g. Jan 31 + 1 month must be Feb 28, not March 3).
      const targetMonthIndex = m - 1 + i; // 0-indexed
      const year = y + Math.floor(targetMonthIndex / 12);
      const month0 = ((targetMonthIndex % 12) + 12) % 12;
      // Last day of target month: day 0 of (month+1) gives last day of (month).
      const lastDayOfMonth = new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
      const day = Math.min(d, lastDayOfMonth);
      const date = new Date(Date.UTC(year, month0, day));
      dates.push(date.toISOString().slice(0, 10));
    }
  } else {
    for (let i = 0; i < occurrences; i++) {
      dates.push(addDays(startDate, stride * i));
    }
  }
  return dates;
}

async function createOne(
  data: ManualBookingInput,
): Promise<ManualBookingResult> {
  const prisma = getPrisma();

  const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
  if (!service) return { ok: false, error: "Service not found" };
  if (!service.active) return { ok: false, error: "Service is inactive" };

  // Validate the slot is available for this service
  const slots = await getAvailableSlots(data.serviceId, data.date);
  if (!slots.includes(data.time)) {
    return { ok: false, error: `Slot ${data.time} not available on ${data.date}` };
  }

  const startTime = londonTimeToUTC(data.date, data.time);
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + service.duration);

  // Resolve user: linkUserId > existing email match > new lite account > guest
  const { userId, clientCreated, setupLink } = await resolveClient({
    linkUserId: data.linkUserId || null,
    name: data.client.name,
    email: data.client.email || null,
    phone: data.client.phone || null,
    sendEmail: data.sendEmail,
  });

  const finalPrice = data.priceOverride ?? service.price;

  let reference: string;
  try {
    reference = await prisma.$transaction(async (tx) => {
      const conflicting = await tx.booking.findFirst({
        where: {
          status: "CONFIRMED",
          startTime: { lt: endTime },
          endTime: { gt: startTime },
        },
      });
      if (conflicting) throw new Error("SLOT_TAKEN");

      let ref = generateReference();
      while (await tx.booking.findUnique({ where: { reference: ref } })) {
        ref = generateReference();
      }

      await tx.booking.create({
        data: {
          reference: ref,
          status: "CONFIRMED",
          source: "ADMIN",
          serviceId: data.serviceId,
          userId,
          guestName: data.client.name,
          guestEmail: data.client.email || null,
          guestPhone: data.client.phone || null,
          startTime,
          endTime,
          price: finalPrice,
          notes: data.notes || null,
        },
      });

      return ref;
    }, { isolationLevel: "Serializable" });
  } catch (err) {
    if (err instanceof Error && err.message === "SLOT_TAKEN") {
      return { ok: false, error: "Slot was taken between availability check and creation" };
    }
    throw err;
  }

  // Send confirmation email if requested + we have an address
  if (data.sendEmail && data.client.email) {
    await sendAdminBookingEmail({
      reference,
      service,
      startTime,
      client: data.client,
      finalPrice,
      setupLink,
    }).catch((err) => console.error("Failed to send admin booking email:", err));
  }

  return { ok: true, reference, clientCreated, setupLink };
}

async function resolveClient(input: {
  linkUserId: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  sendEmail: boolean;
}): Promise<{ userId: string | null; clientCreated: boolean; setupLink: string | null }> {
  const prisma = getPrisma();

  // Explicit existing-user link
  if (input.linkUserId) {
    return { userId: input.linkUserId, clientCreated: false, setupLink: null };
  }

  // No email → guest booking
  if (!input.email) {
    return { userId: null, clientCreated: false, setupLink: null };
  }

  // Email match → link to existing user
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    return { userId: existing.id, clientCreated: false, setupLink: null };
  }

  // Brand new → create lite User (no password) + setup token
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      phone: input.phone,
      role: "CLIENT",
      hashedPassword: null,
    },
  });

  let setupLink: string | null = null;
  if (input.sendEmail) {
    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + PASSWORD_SETUP_TTL_MINUTES * 60 * 1000);
    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://healingwithboo.co.uk";
    setupLink = `${baseUrl}/forgot-password/reset?token=${rawToken}`;
  }

  return { userId: user.id, clientCreated: true, setupLink };
}

async function sendAdminBookingEmail(args: {
  reference: string;
  service: { name: string; duration: number };
  startTime: Date;
  client: { name: string };
  finalPrice: number;
  setupLink: string | null;
}) {
  const { sendEmail } = await import("@/lib/email");
  const { buildAdminBookingEmail } = await import("@/lib/emails/admin-booking");
  const { formatDate, formatTime, formatDuration, formatPrice } = await import("@/lib/utils");

  const email = buildAdminBookingEmail({
    reference: args.reference,
    guestName: args.client.name,
    serviceName: args.service.name,
    date: formatDate(args.startTime),
    time: formatTime(args.startTime),
    duration: formatDuration(args.service.duration),
    price: `${formatPrice(args.finalPrice)} (pay on the day)`,
    setupLink: args.setupLink,
  });

  // Look up the guest email stored on the booking
  const prisma = getPrisma();
  const booking = await prisma.booking.findUnique({
    where: { reference: args.reference },
    select: { guestEmail: true },
  });
  if (!booking?.guestEmail) return;

  await sendEmail({
    to: booking.guestEmail,
    subject: email.subject,
    html: email.html,
  });
}
