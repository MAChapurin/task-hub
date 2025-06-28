import { Stats } from '@/shared/ui/stats';
import { ProjectsStatistic } from '@/widgets/projects-statistic/ui/projects-statistic';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for tasks',
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex flex-col gap-4 items-stretch w-full max-w-full lg:max-w-2xs">
          <Stats
            title="Active Projects"
            stats="92"
            src="/project-stats-icons/active-projects.svg"
            backgroundColor="bg-[var(--chart-1)]"
          />
          <Stats
            title="On going Projects"
            stats="35"
            src="/project-stats-icons/ongoing-projects.svg"
            backgroundColor="bg-[var(--chart-4)]"
          />
          <Stats
            title="Working hours"
            stats="19h 9m"
            src="/project-stats-icons/working-hours.svg"
            backgroundColor="bg-[var(--chart-3)]"
          />
        </div>
        <div className="min-w-2xs grow h-105">
          <ProjectsStatistic />
        </div>
      </div>
    </>
  );
}
