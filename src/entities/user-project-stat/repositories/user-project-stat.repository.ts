import { prisma } from '@/shared/lib/db';

export const userProjectStatRepository = {
  getByUserId: (userId: string) => {
    return prisma.userProjectStat.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });
  },
};
