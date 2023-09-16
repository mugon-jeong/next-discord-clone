import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// next13 핫리로드로 PrismaClient를 초기화하지 않게 하기 위해
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
