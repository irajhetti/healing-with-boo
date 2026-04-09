import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { _prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma._prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not set");
    const adapter = new PrismaPg({ connectionString });
    globalForPrisma._prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma._prisma;
}
