import { Metadata } from 'next';

import { getCurrentUser } from '@/entities/user/server';
import { getProjectsByUser, getInProgressUserTasks, getUserTasks } from '@/entities/project/server';
import { getUserProjectStat } from '@/entities/user-project-stat/server';

import { matchEither } from '@/shared/lib/either';

import { DashboardStats, ProjectSection, TodayTasksWidget } from '@/widgets';

export const metadata: Metadata = {
  title: 'Проекты',
  description: 'Проекты для задач',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return <UserNotFound />;

  const [projectsResult, tasksResult, inProgressTasksResult, statsResult] = await Promise.all([
    getProjectsByUser(user.id),
    getUserTasks(user.id),
    getInProgressUserTasks(user.id),
    getUserProjectStat(user.id),
  ]);

  const projects = matchEither(projectsResult, {
    left: () => null,
    right: (p) => p,
  });

  const doneTasks = matchEither(tasksResult, {
    left: () => [],
    right: (t) => t,
  });

  const inProgressTasks = matchEither(inProgressTasksResult, {
    left: () => [],
    right: (t) => t,
  });

  const stats = matchEither(statsResult, {
    left: () => [],
    right: (s) =>
      s.map((stat) => ({
        ...stat,
        date: new Date(stat.date),
      })),
  });

  if (!projects) return <ProjectFetchError error="unknown-error" />;

  return (
    <div>
      <h1 className="font-semibold text-4xl w-fit mb-4">Проекты</h1>
      <DashboardStats
        activeTasks={inProgressTasks.length}
        projectsCount={projects.length}
        workingHours={calculateWorkingHours(doneTasks)}
        stats={stats}
      />
      <ProjectSection projects={projects} currentUserId={user.id} />
      <TodayTasksWidget tasks={inProgressTasks} />
    </div>
  );
}

function calculateWorkingHours(tasks: { status: string; durationHours?: number | null }[]): number {
  return tasks
    .filter((task) => task.status === 'DONE' && typeof task.durationHours === 'number')
    .reduce((sum, task) => sum + (task.durationHours ?? 0), 0);
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

function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold">Ошибка: пользователь не найден</h1>
      <p className="text-gray-500 mt-2">Пожалуйста, войдите в систему заново.</p>
    </div>
  );
}
