import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  throw new Error("TURSO_DATABASE_URL environment variable is required");
}

const adapter = new PrismaLibSQL({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN, // optional if included in URL
});

export const prisma = new PrismaClient({ adapter });
