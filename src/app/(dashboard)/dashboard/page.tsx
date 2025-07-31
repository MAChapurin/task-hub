import { getInProgressUserTasks, getProjectsByUser, getUserTasks } from '@/entities/project/server';
import { getCurrentUser } from '@/entities/user/server';

import { ProjectSection } from '@/widgets/project-list';
import { TodayTasksWidget } from '@/widgets/today-task/ui/today-task';
import { ProjectTasksWidgetServer } from '@/widgets/project-tasks/ui/project-tasks-widget-server';
import { TaskDrawer } from '@/widgets/project-tasks/ui/task-drawer';

import { matchEither } from '@/shared/lib/either';

import { Metadata } from 'next';
import { DashboardStats } from '@/widgets/dashboard-stats';

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

  const params = await searchParams;
  const projectId = params.projectId || '';

  return matchEither(projectsResult, {
    left: (error) => <ProjectFetchError error={error} />,
    right: (projects) => {
      const workingHours = calculateWorkingHours(tasksResult);
      return (
        <div>
          <h1 className="font-semibold text-4xl w-fit mb-4">Проекты</h1>

          <DashboardStats
            activeTasks={matchEither(inProgressTasksResult, {
              left: () => 0,
              right: (tasks) => tasks.length,
            })}
            projectsCount={projects.length}
            workingHours={workingHours}
          />

          <ProjectSection projects={projects} currentUserId={user.id} />

          {matchEither(inProgressTasksResult, {
            left: () => (
              <div className="text-red-600 mt-4 ml-2">Ошибка загрузки задач в работе</div>
            ),
            right: (tasks) => <TodayTasksWidget tasks={tasks} />,
          })}

          <TaskDrawer>
            <ProjectTasksWidgetServer projectId={projectId} />
          </TaskDrawer>
        </div>
      );
    },
  });
}

function calculateWorkingHours(tasksResult: Awaited<ReturnType<typeof getUserTasks>>): number {
  return matchEither(tasksResult, {
    left: () => 0,
    right: (tasks) =>
      tasks
        .filter((task) => task.status === 'DONE' && typeof task.durationHours === 'number')
        .reduce((sum, task) => sum + (task.durationHours ?? 0), 0),
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

function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold">Ошибка: пользователь не найден</h1>
      <p className="text-gray-500 mt-2">Пожалуйста, войдите в систему заново.</p>
    </div>
  );
}
