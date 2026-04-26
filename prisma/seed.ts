import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashSync } from "bcryptjs";
import { SERVICES } from "../src/lib/config/services";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const BUSINESS_HOURS = [
  { dayOfWeek: 0, open: null, close: null }, // Sunday: Closed
  { dayOfWeek: 1, open: "14:00", close: "20:00" },
  { dayOfWeek: 2, open: "16:00", close: "20:00" },
  { dayOfWeek: 3, open: "11:00", close: "20:30" },
  { dayOfWeek: 4, open: "10:30", close: "21:30" },
  { dayOfWeek: 5, open: "15:00", close: "20:30" },
  { dayOfWeek: 6, open: "10:00", close: "17:00" },
];

async function main() {
  // Seed services
  console.log("Seeding services...");
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        category: service.category,
        description: service.description,
        duration: service.duration,
        price: service.price,
        sortOrder: service.sortOrder,
      },
      create: service,
    });
  }
  console.log(`Seeded ${SERVICES.length} services.`);

  // Seed business hours
  console.log("Seeding business hours...");
  for (const hours of BUSINESS_HOURS) {
    await prisma.businessHours.upsert({
      where: { dayOfWeek: hours.dayOfWeek },
      update: { open: hours.open, close: hours.close },
      create: hours,
    });
  }
  console.log("Seeded 7 business hours.");

  // Seed admin user
  const adminEmail = "zonedoutbeauty@gmail.com";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;
    if (!adminPassword || adminPassword.length < 12) {
      throw new Error(
        "ADMIN_INITIAL_PASSWORD env var is required (min 12 chars) to seed the admin user. Set it before running seed.",
      );
    }
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Leah",
        hashedPassword: hashSync(adminPassword, 12),
        role: "ADMIN",
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
