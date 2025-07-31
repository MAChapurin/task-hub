import { prisma } from '@/shared/lib/db';

export const logDailyProjectStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const users = await prisma.user.findMany({
    select: { id: true },
  });

  for (const user of users) {
    const activeProjectCount = await prisma.project.count({
      where: {
        ownerId: user.id,
        status: 'IN_PROGRESS',
      },
    });

    await prisma.userProjectStat.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
      update: {
        projects: activeProjectCount,
      },
      create: {
        userId: user.id,
        date: today,
        projects: activeProjectCount,
      },
    });
  }

  console.log(`✅ Project stats written for ${users.length} users`);
};
