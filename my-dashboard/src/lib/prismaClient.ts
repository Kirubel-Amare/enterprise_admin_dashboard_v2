// lib/prismaClient.ts

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Production → Turso
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.TURSO_DATABASE_URL!,
      },
    },
  });
} else {
  // Development → SQLite
  prisma = new PrismaClient();
}

export default prisma;
