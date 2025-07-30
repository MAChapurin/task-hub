import { projectRepository } from '@/entities/project/repositories/project.repository';
import { taskRepository } from '@/entities/task/repositories/task.repository';
import { Either, left, right } from '@/shared/lib/either';
import { Task } from '@prisma/client';

export const getUserTasks = async (userId: string): Promise<Either<'unknown-error', Task[]>> => {
  try {
    const projects = await projectRepository.getByUserId(userId);
    const projectIds = projects.map((project) => project.id);

    const taskLists = await Promise.all(
      projectIds.map((projectId) => taskRepository.getByProjectId(projectId))
    );

    const allTasks = taskLists.flat();

    return right(allTasks);
  } catch (error) {
    console.error('Ошибка при получении задач пользователя:', error);
    return left('unknown-error');
  }
};
