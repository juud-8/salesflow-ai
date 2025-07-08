import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
