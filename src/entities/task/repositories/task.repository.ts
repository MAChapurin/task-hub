import { prisma } from '@/shared/lib/db';
import { TaskStatus } from '@prisma/client';

export const taskRepository = {
  getById: (id: string) =>
    prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
      },
    }),

  getByProjectId: (projectId: string) =>
    prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
    }),

  create: (data: {
    title: string;
    projectId: string;
    startDate?: Date;
    completedAt?: Date;
    status?: TaskStatus;
    durationHours?: number;
  }) =>
    prisma.task.create({
      data: {
        title: data.title,
        projectId: data.projectId,
        startDate: data.startDate,
        completedAt: data.completedAt,
        status: data.status ?? 'BACKLOG',
        durationHours: data.durationHours,
      },
    }),

  update: (
    id: string,
    data: Partial<{
      title: string;
      startDate: Date;
      completedAt: Date;
      status: TaskStatus;
      durationHours: number;
    }>
  ) =>
    prisma.task.update({
      where: { id },
      data,
    }),

  delete: (id: string) =>
    prisma.task.delete({
      where: { id },
    }),
};
