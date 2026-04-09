import { config } from "dotenv";
import path from "node:path";
import { defineConfig } from "prisma/config";

config({ path: path.join(__dirname, ".env.local") });

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
