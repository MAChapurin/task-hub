import { getProjectsByUser } from '@/entities/project/server';
import { getCurrentUser } from '@/entities/user/server';

import { ProjectsStatistic } from '@/widgets/projects-statistic/ui/projects-statistic';
import { Stats } from '@/shared/ui/stats';

import { Metadata } from 'next';
import { matchEither } from '@/shared/lib/either';

import { ProjectSection } from '@/widgets/project-list';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for tasks',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Ошибка: пользователь не найден</h1>
      </div>
    );
  }

  const projectsResult = await getProjectsByUser(user.id);

  return matchEither(projectsResult, {
    left: (error) => (
      <div className="flex flex-col items-center justify-center mt-10 text-red-600">
        <h1 className="text-2xl font-bold mb-2">Ошибка при получении проектов</h1>
        <p className="text-sm">
          Код ошибки: <code>{error}</code>
        </p>
      </div>
    ),

    right: (projects) => (
      <>
        <div className="flex flex-wrap xl:grid xl:grid-cols-3 gap-4 mb-4">
          <section className="flex flex-col gap-4 items-stretch w-full max-w-full">
            <Stats
              title="Active Projects"
              stats={String(projects.length)}
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
        <ProjectSection projects={projects} currentUserId={user.id} />
      </>
    ),
  });
}
