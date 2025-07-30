import { Task as PrismaTask, Project } from '@prisma/client';

export type Task = PrismaTask;

export type TaskWithProject = PrismaTask & {
  project: Pick<Project, 'id' | 'title' | 'icon' | 'status'>;
};
