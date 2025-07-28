import { left, right, Either } from '@/shared/lib/either';
import { taskRepository } from '../repositories/task.repository';
import { TaskStatus } from '@prisma/client';

export const createTask = async ({
  title,
  projectId,
  startDate,
  completedAt,
  status = TaskStatus.BACKLOG,
  durationHours,
}: {
  title: string;
  projectId: string;
  startDate?: Date;
  completedAt?: Date;
  status?: TaskStatus;
  durationHours?: number;
}): Promise<
  Either<'task-title-already-exists' | 'invalid-dates' | 'unknown-error', { id: string }>
> => {
  try {
    const existingTasks = await taskRepository.getByProjectId(projectId);
    const duplicate = existingTasks.find((t) => t.title.toLowerCase() === title.toLowerCase());
    if (duplicate) {
      return left('task-title-already-exists');
    }

    if (startDate && completedAt && completedAt < startDate) {
      return left('invalid-dates');
    }

    const task = await taskRepository.create({
      title,
      projectId,
      startDate,
      completedAt,
      status,
      durationHours,
    });

    return right({ id: task.id });
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    return left('unknown-error');
  }
};
