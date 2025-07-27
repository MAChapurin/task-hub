import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ownerId = 'cmdhq0bt20000o26y0aht1de7';

  await prisma.project.createMany({
    data: [
      {
        id: 'project1',
        title: 'Первый проект',
        dueDate: new Date('2025-12-31'),
        icon: '🚀',
        ownerId,
      },
      {
        id: 'project2',
        title: 'Второй проект',
        dueDate: new Date('2025-11-15'),
        icon: '📦',
        ownerId,
      },
      {
        id: 'project3',
        title: 'Завершённый проект',
        dueDate: new Date('2024-06-30'),
        icon: '✅',
        ownerId,
      },
    ],
    skipDuplicates: true,
  });

  // Участники для project1
  await prisma.projectParticipant.upsert({
    where: {
      userId_projectId: {
        userId: ownerId,
        projectId: 'project1',
      },
    },
    update: {},
    create: {
      userId: ownerId,
      projectId: 'project1',
    },
  });

  // Участник 2 для project1
  await prisma.user.upsert({
    where: { id: 'participant1' },
    update: {},
    create: {
      id: 'participant1',
      login: 'participant1',
      passwordHash: 'fakehash',
      salt: '',
      email: 'participant1@example.com',
      name: 'Иван',
      surname: 'Иванов',
      avatarUrl: null,
    },
  });

  await prisma.projectParticipant.upsert({
    where: {
      userId_projectId: {
        userId: 'participant1',
        projectId: 'project1',
      },
    },
    update: {},
    create: {
      userId: 'participant1',
      projectId: 'project1',
    },
  });

  // Участники для project2
  await prisma.projectParticipant.upsert({
    where: {
      userId_projectId: {
        userId: ownerId,
        projectId: 'project2',
      },
    },
    update: {},
    create: {
      userId: ownerId,
      projectId: 'project2',
    },
  });

  // Участники для project3
  await prisma.projectParticipant.upsert({
    where: {
      userId_projectId: {
        userId: ownerId,
        projectId: 'project3',
      },
    },
    update: {},
    create: {
      userId: ownerId,
      projectId: 'project3',
    },
  });

  console.log('Projects seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
