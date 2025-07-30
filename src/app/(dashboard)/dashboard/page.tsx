import { getInProgressUserTasks, getProjectsByUser, getUserTasks } from '@/entities/project/server';
import { getCurrentUser } from '@/entities/user/server';

import { ProjectSection } from '@/widgets/project-list';
import { TodayTasksWidget } from '@/widgets/today-task/ui/today-task';
import { ProjectTasksWidgetServer } from '@/widgets/project-tasks/ui/project-tasks-widget-server';
import { TaskDrawer } from '@/widgets/project-tasks/ui/task-drawer';

import { matchEither } from '@/shared/lib/either';

import { Metadata } from 'next';
import { Stats } from '@/shared/ui/stats';
import { pluralize } from '@/shared/lib/pluralize';
import { ProjectsStatistic } from '@/widgets';

export const metadata: Metadata = {
  title: 'Проекты',
  description: 'Проекты для задач',
};

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await getCurrentUser();
  if (!user) return <UserNotFound />;

  const [projectsResult, tasksResult, inProgressTasksResult] = await Promise.all([
    getProjectsByUser(user.id),
    getUserTasks(user.id),
    getInProgressUserTasks(user.id),
  ]);

  const workingHours = calculateWorkingHours(tasksResult);
  const params = await searchParams;
  const projectId = params.projectId || '';

  return matchEither(projectsResult, {
    left: (error) => <ProjectFetchError error={error} />,
    right: (projects) => (
      <>
        <DashboardStats projectsCount={projects.length} workingHours={workingHours} />
        <ProjectSection projects={projects} currentUserId={user.id} />

        {inProgressTasksResult.type === 'right' ? (
          <TodayTasksWidget tasks={inProgressTasksResult.value} />
        ) : (
          <div className="text-red-600 mt-4 ml-2">Ошибка загрузки задач в работе</div>
        )}

        <TaskDrawer>
          <ProjectTasksWidgetServer projectId={projectId} />
        </TaskDrawer>
      </>
    ),
  });
}

function ProjectFetchError({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-red-600">
      <h1 className="text-2xl font-bold mb-2">Ошибка при получении проектов</h1>
      <p className="text-sm">
        Код ошибки: <code>{error}</code>
      </p>
    </div>
  );
}

function DashboardStats({
  projectsCount,
  workingHours,
}: {
  projectsCount: number;
  workingHours: number;
}) {
  return (
    <>
      <h1 className="font-semibold text-4xl w-fit mb-4">Dashboard</h1>
      <div className="flex flex-wrap xl:grid xl:grid-cols-3 gap-4 mb-4">
        <section className="flex flex-col gap-4 items-stretch w-full max-w-full">
          <Stats
            title={pluralize(projectsCount, ['Проект', 'Проекта', 'Проектов'])}
            stats={String(projectsCount)}
            src="/project-stats-icons/active-projects.svg"
            backgroundColor="bg-[var(--chart-1)]"
          />
          <Stats
            title={pluralize(35, ['Задача', 'Задачи', 'Задач'])}
            stats="35"
            src="/project-stats-icons/ongoing-projects.svg"
            backgroundColor="bg-[var(--chart-4)]"
          />
          <Stats
            title={pluralize(workingHours, ['Рабочий час', 'Рабочих часа', 'Рабочих часов'])}
            stats={String(workingHours)}
            src="/project-stats-icons/working-hours.svg"
            backgroundColor="bg-[var(--chart-3)]"
          />
        </section>
        <section className="xl:col-span-2 min-h-105 w-full">
          <ProjectsStatistic />
        </section>
      </div>
    </>
  );
}

function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Ошибка: пользователь не найден</h1>
    </div>
  );
}

function calculateWorkingHours(tasksResult: Awaited<ReturnType<typeof getUserTasks>>): number {
  if (tasksResult.type !== 'right') return 0;

  return tasksResult.value
    .filter((task) => task.status === 'DONE' && typeof task.durationHours === 'number')
    .reduce((sum, task) => sum + (task.durationHours ?? 0), 0);
}
