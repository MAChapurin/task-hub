import { getProjectById } from '@/entities/project/services/get-project-by-id';
import { getTasksByProject } from '@/entities/task/services/get-tasks-by-project';
import { matchEither } from '@/shared/lib/either';
import { ProjectTasksWidgetClient } from './project-tasks-widget-client';

export async function ProjectTasksWidgetServer({ projectId }: { projectId: string }) {
  const projectRes = await getProjectById(projectId);
  const taskRes = await getTasksByProject(projectId);

  const project = matchEither(projectRes, { right: (d) => d, left: () => null });
  const tasks = matchEither(taskRes, { right: (d) => d, left: () => [] });

  if (!project) {
    return <p className="text-sm text-muted-foreground">Проект не найден</p>;
  }

  const serializedTasks = tasks.map((task) => ({
    ...task,
    createdAt: task.createdAt.toISOString(),
    startDate: task.startDate ? task.startDate.toISOString() : null,
    completedAt: task.completedAt ? task.completedAt.toISOString() : null,
  }));

  return <ProjectTasksWidgetClient initialTasks={serializedTasks} />;
}
