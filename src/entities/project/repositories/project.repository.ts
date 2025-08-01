import { prisma } from '@/shared/lib/db';
import { ProjectWithParticipants } from '../domain';

export const projectRepository = {
  getById: (id: string) =>
    prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatarUrl: true,
            email: true,
            login: true,
            passwordHash: true,
            salt: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                surname: true,
                avatarUrl: true,
                email: true,
              },
            },
          },
        },
      },
    }),

  getByUserId: async (userId: string): Promise<ProjectWithParticipants[]> => {
    const owned = await prisma.project.findMany({
      where: { ownerId: userId },
      include: {
        owner: true,
        participants: {
          include: {
            user: { select: { id: true, name: true, surname: true, avatarUrl: true, email: true } },
          },
        },
      },
    });

    const participating = await prisma.project.findMany({
      where: {
        participants: { some: { userId } },
        NOT: { ownerId: userId },
      },
      include: {
        owner: true,
        participants: {
          include: {
            user: { select: { id: true, name: true, surname: true, avatarUrl: true } },
          },
        },
      },
    });

    return [...owned, ...participating];
  },

  create: (data: {
    title: string;
    dueDate: Date;
    icon: string;
    ownerId: string;
    status?: string;
    participantIds?: string[];
  }) =>
    prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          title: data.title,
          dueDate: data.dueDate,
          icon: data.icon,
          ownerId: data.ownerId,
          status: data.status ?? 'BACKLOG',
        },
      });

      if (data.participantIds?.length) {
        await tx.projectParticipant.createMany({
          data: data.participantIds.map((userId) => ({
            userId,
            projectId: project.id,
          })),
        });
      }

      return project;
    }),

  update: (
    id: string,
    data: Partial<{
      title: string;
      dueDate: Date;
      icon: string;
      status: string;
    }>
  ) =>
    prisma.project.update({
      where: { id },
      data,
    }),

  delete: (id: string) =>
    prisma.project.delete({
      where: { id },
    }),
};
