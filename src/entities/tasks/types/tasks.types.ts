import { IUser, Percent } from '@/shared/types';

export type TaskStatus = 'pending' | 'in progress' | 'done';

export interface ITask {
  id: string;
  title: string;
  status: TaskStatus;
  progress: Percent;
  dueDate: Date;
  users: IUser[];
}
