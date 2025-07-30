import { prisma } from '@/shared/lib/db';
import { Either, left, right } from '@/shared/lib/either';

type InProgressTask = {
  id: string;
  title: string;
  startDate: Date | null;
  durationHours: number | null;
  status: 'BACKLOG' | 'IN_PROGRESS' | 'DONE';
  project: {
    title: string;
  };
};

export const getInProgressUserTasks = async (
  userId: string
): Promise<Either<'unknown-error', InProgressTask[]>> => {
  try {
    const userProjects = await prisma.project.findMany({
      where: {
        OR: [{ ownerId: userId }, { participants: { some: { userId } } }],
      },
      select: { id: true },
    });

    const projectIds = userProjects.map((p) => p.id);

    if (projectIds.length === 0) return right([]);

    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
        status: 'IN_PROGRESS',
      },
      select: {
        id: true,
        title: true,
        startDate: true,
        durationHours: true,
        status: true,
        project: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return right(tasks);
  } catch (error) {
    console.error('[getInProgressUserTasks] Ошибка:', error);
    return left('unknown-error');
  }
};
