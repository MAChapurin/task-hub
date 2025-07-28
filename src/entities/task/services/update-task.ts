import { taskRepository } from '../repositories/task.repository';
import { Either, left, right } from '@/shared/lib/either';
import { TaskStatus } from '@prisma/client';

type UpdateTaskInput = {
  id: string;
  title?: string;
  startDate?: Date;
  completedAt?: Date;
  status?: TaskStatus;
  durationHours?: number;
};

export const updateTask = async ({
  id,
  ...updateData
}: UpdateTaskInput): Promise<
  Either<'task-not-found' | 'invalid-dates' | 'unknown-error', { id: string }>
> => {
  try {
    const existingTask = await taskRepository.getById(id);
    if (!existingTask) {
      return left('task-not-found');
    }

    if (
      updateData.startDate &&
      updateData.completedAt &&
      updateData.completedAt < updateData.startDate
    ) {
      return left('invalid-dates');
    }

    const updated = await taskRepository.update(id, updateData);
    return right({ id: updated.id });
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
    return left('unknown-error');
  }
};
