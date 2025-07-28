import { Task, Project } from '@prisma/client';

export type TaskWithProject = Task & {
  project: Pick<Project, 'id' | 'title' | 'icon' | 'status'>;
};
