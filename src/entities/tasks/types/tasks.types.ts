import { IUser, Percent } from '@/shared/types';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

export type TaskStatus = 'pending' | 'in progress' | 'done';

export interface ISubTask {
  id: string;
  title: string;
}

export interface ITask {
  id: string;
  title: string;
  status: TaskStatus;
  progress: Percent;
  dueDate: Date;
  users: IUser[];
  icon: IconName;
  subtasks: ISubTask[];
}
