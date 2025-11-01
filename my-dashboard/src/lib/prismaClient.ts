// lib/prismaClient.ts
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Production → Turso
  prisma = new PrismaClient({
    adapter: new PrismaLibSQL({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!, // optional if included in URL
    }),
  });
} else {
  // Development → SQLite
  prisma = new PrismaClient();
}

export default prisma;
