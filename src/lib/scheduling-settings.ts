import { getPrisma } from "@/lib/db";

export type SchedulingSettings = {
  bufferMinutes: number;
  slotIncrement: number;
  bookingHorizonDays: number;
};

const SINGLETON_ID = "default";

const DEFAULTS: SchedulingSettings = {
  bufferMinutes: 15,
  slotIncrement: 15,
  bookingHorizonDays: 60,
};

/**
 * Reads the scheduling settings singleton, creating it with defaults on first run.
 * Bumped reads are fine — the row has 4 columns and is queried by primary key.
 */
export async function getSchedulingSettings(): Promise<SchedulingSettings> {
  const prisma = getPrisma();
  const existing = await prisma.schedulingSettings.findUnique({
    where: { id: SINGLETON_ID },
  });
  if (existing) {
    return {
      bufferMinutes: existing.bufferMinutes,
      slotIncrement: existing.slotIncrement,
      bookingHorizonDays: existing.bookingHorizonDays,
    };
  }
  await prisma.schedulingSettings.create({
    data: { id: SINGLETON_ID, ...DEFAULTS },
  });
  return DEFAULTS;
}

export async function updateSchedulingSettingsRecord(
  settings: SchedulingSettings,
): Promise<void> {
  const prisma = getPrisma();
  await prisma.schedulingSettings.upsert({
    where: { id: SINGLETON_ID },
    update: settings,
    create: { id: SINGLETON_ID, ...settings },
  });
}
