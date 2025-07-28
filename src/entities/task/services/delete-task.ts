import { taskRepository } from '../repositories/task.repository';
import { Either, left, right } from '@/shared/lib/either';

type DeleteTaskInput = {
  id: string;
};

export const deleteTask = async ({
  id,
}: DeleteTaskInput): Promise<Either<'task-not-found' | 'unknown-error', { id: string }>> => {
  try {
    const task = await taskRepository.getById(id);
    if (!task) {
      return left('task-not-found');
    }

    await taskRepository.delete(id);
    return right({ id });
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
    return left('unknown-error');
  }
};
