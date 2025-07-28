import { taskRepository } from '../repositories/task.repository';
import { Either, left, right } from '@/shared/lib/either';
import { Task } from '@prisma/client';

export const getTasksByProject = async (
  projectId: string
): Promise<Either<'unknown-error', Task[]>> => {
  try {
    const tasks = await taskRepository.getByProjectId(projectId);
    return right(tasks);
  } catch (error) {
    console.error('Ошибка при получении задач проекта:', error);
    return left('unknown-error');
  }
};
