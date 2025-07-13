import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const avatarBase =
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-';

const users = [
  { id: 'u1', name: 'Alice Johnson', avatarUrl: `${avatarBase}1.png` },
  { id: 'u2', name: 'Bob Smith', avatarUrl: `${avatarBase}2.png` },
  { id: 'u3', name: 'Charlie Brown', avatarUrl: `${avatarBase}3.png` },
];

const projects = [
  {
    id: 't1',
    title: 'Design UI',
    status: 'pending',
    progress: 0,
    dueDate: new Date('2025-07-10'),
    icon: 'Plane',
    tasks: [],
  },
  {
    id: 't2',
    title: 'Set up database',
    status: 'in progress',
    progress: 25,
    dueDate: new Date('2025-07-12'),
    icon: 'Plane',
    tasks: [],
  },
  {
    id: 't3',
    title: 'Implement authentication',
    status: 'done',
    progress: 100,
    dueDate: new Date('2025-07-05'),
    icon: 'Plane',
    tasks: [
      { id: 'st1', title: 'Design login screen' },
      { id: 'st2', title: 'Create backend endpoint' },
      { id: 'st3', title: 'Test authentication flow' },
    ],
  },
  {
    id: 't4',
    title: 'Write documentation',
    status: 'in progress',
    progress: 40,
    dueDate: new Date('2025-07-08'),
    icon: 'Plane',
    tasks: [],
  },
  {
    id: 't5',
    title: 'Create unit tests',
    status: 'pending',
    progress: 0,
    dueDate: new Date('2025-07-14'),
    icon: 'Plane',
    tasks: [],
  },
  {
    id: 't6',
    title: 'Deploy to staging',
    status: 'in progress',
    progress: 60,
    dueDate: new Date('2025-07-15'),
    icon: 'Plane',
    tasks: [
      { id: 'st4', title: 'Build release version' },
      { id: 'st5', title: 'Upload to server' },
      { id: 'st6', title: 'Smoke test deployment' },
    ],
  },
  {
    id: 't7',
    title: 'Fix reported bugs',
    status: 'in progress',
    progress: 75,
    dueDate: new Date('2025-07-16'),
    icon: 'Plane',
    tasks: [],
  },
  {
    id: 't8',
    title: 'Code review',
    status: 'done',
    progress: 100,
    dueDate: new Date('2025-07-07'),
    icon: 'Plane',
    tasks: [],
  },
  {
    id: 't9',
    title: 'Refactor modules',
    status: 'in progress',
    progress: 50,
    dueDate: new Date('2025-07-20'),
    icon: 'PlaneIcon',
    tasks: [
      { id: 'st7', title: 'Clean up old code' },
      { id: 'st8', title: 'Extract reusable components' },
      { id: 'st9', title: 'Improve typing' },
    ],
  },
];

async function seed() {
  await prisma.task.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  const createdUsers = [];

  for (let i = 0; i < users.length; i++) {
    const userData = users[i];

    const user = await prisma.user.create({
      data: {
        id: userData.id,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
      },
    });
    createdUsers.push(user);

    for (let j = 0; j < 9; j++) {
      const projectData = projects[j % projects.length];

      const project = await prisma.project.create({
        data: {
          id: `${user.id}_proj_${j + 1}`,
          title: `${projectData.title} (${user.name})`,
          status: projectData.status,
          progress: projectData.progress,
          dueDate: projectData.dueDate,
          icon: projectData.icon,
          ownerId: user.id,
        },
      });

      for (const task of projectData.tasks) {
        await prisma.task.create({
          data: {
            id: `${project.id}_${task.id}`,
            title: task.title,
            projectId: project.id,
          },
        });
      }
    }
  }

  console.log('Seeding completed');
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
