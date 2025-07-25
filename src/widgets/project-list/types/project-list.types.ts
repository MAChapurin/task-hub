import { ProjectWithParticipants } from '@/entities/project/domain';
import { Percent } from '@/shared/types';

export type ProgressProps = {
  value: Percent;
  background?: string;
};

export type ProjectCardProps = {
  project: ProjectWithParticipants;
};
