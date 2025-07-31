import { UserProjectStatEntry } from '@/entities/user-project-stat/domain';

export interface DashboardStatsProps {
  projectsCount: number;
  workingHours: number;
  activeTasks: number;
  stats: UserProjectStatEntry[];
}
