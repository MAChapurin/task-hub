import { ProjectWithParticipants } from '@/entities/project/domain';
import { Percent } from '@/shared/types';

export type ProgressProps = {
  value: Percent;
  background?: string;
};

export type ProjectCardProps = {
  project: ProjectWithParticipants;
  currentUserId: string;
};

export type ProjectListProps = {
  projects: ProjectWithParticipants[];
  currentUserId: string;
};
