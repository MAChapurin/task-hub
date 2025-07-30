export type TaskStatus = 'BACKLOG' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  id: string;
  title: string;
  createdAt: string;
  startDate?: string | null;
  completedAt?: string | null;
  status: TaskStatus;
  durationHours?: number | null;
};
