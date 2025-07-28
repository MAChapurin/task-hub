import { taskRepository } from '../repositories/task.repository';
import { Either, left, right } from '@/shared/lib/either';
import { Task } from '@prisma/client';

export const getTaskById = async (
  id: string
): Promise<Either<'task-not-found' | 'unknown-error', Task>> => {
  try {
    const task = await taskRepository.getById(id);

    if (!task) {
      return left('task-not-found');
    }

    return right(task);
  } catch (error) {
    console.error('Ошибка при получении задачи по ID:', error);
    return left('unknown-error');
  }
};
