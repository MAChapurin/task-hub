import { getProjectsByUser } from '@/entities/project/server';
import { CreateProjectDialog } from '@/entities/project/ui/create-project-dialog';
import { ProjectList } from '@/entities/project/ui/project-list';
import { getCurrentUser } from '@/entities/user/server';
import { Stats } from '@/shared/ui/stats';

import { LastTasks } from '@/widgets';

import { ProjectsStatistic } from '@/widgets/projects-statistic/ui/projects-statistic';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for tasks',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Error: not user</h1>
      </div>
    );

  const projects = await getProjectsByUser(user.id);
  return (
    <>
      <div className="flex flex-wrap xl:grid xl:grid-cols-3 gap-4 mb-4">
        <section className="flex flex-col gap-4 items-stretch w-full max-w-full">
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
        </section>
        <section className="xl:col-span-2 min-h-105 w-full">
          <ProjectsStatistic />
        </section>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Мои проекты ({projects.length})</h2>
        <CreateProjectDialog />
        <ProjectList projects={projects} />
      </section>
      <LastTasks />
    </>
  );
}
