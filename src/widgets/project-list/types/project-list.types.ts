import { ProjectWithParticipants } from '@/entities/project/domain';
import { Percent } from '@/shared/types';

export type ProgressProps = {
  value: Percent;
  background?: string;
};

export type ProjectCardProps = {
  project: ProjectWithParticipants;
  currentUserId: string;
  progress: Percent;
};

export type ProjectListProps = {
  projects: ProjectWithParticipants[];
  currentUserId: string;
  tasks: {
    id: string;
    title: string;
    status: 'BACKLOG' | 'IN_PROGRESS' | 'DONE';
    createdAt: Date;
    startDate: Date | null;
    completedAt: Date | null;
    durationHours: number | null;
    projectId: string;
  }[];
};

export interface ClickCatcherWrapperProps {
  children: React.ReactNode;
  className?: string;
}
