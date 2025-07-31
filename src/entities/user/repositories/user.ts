import { prisma } from '@/shared/lib/db';
import { UserEntity } from '../domain';
import { Prisma } from '@prisma/client';

export function saveUser(user: UserEntity): Promise<UserEntity> {
  return prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: user,
    update: user,
  });
}

export function getUser(where: Prisma.UserWhereInput) {
  return prisma.user.findFirst({ where });
}

export function searchUsers(query: string, limit = 10) {
  return prisma.user.findMany({
    where: {
      OR: [
        { login: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } },
        { surname: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: limit,
    orderBy: {
      login: 'asc',
    },
  });
}

export const userRepository = { saveUser, getUser, searchUsers };
