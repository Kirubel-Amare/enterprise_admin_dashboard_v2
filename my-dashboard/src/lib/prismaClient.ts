// lib/prismaClient.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (!globalThis.prisma) {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma; // Prevent multiple instances in dev
  }
} else {
  prisma = globalThis.prisma;
}

export default prisma;
