import { projectRepository } from '../repositories/project.repository';
import { Either, left, right } from '@/shared/lib/either';

type DeleteProjectInput = {
  id: string;
  userId: string;
};

export const deleteProject = async ({
  id,
  userId,
}: DeleteProjectInput): Promise<
  Either<'project-not-found' | 'forbidden' | 'unknown-error', { id: string }>
> => {
  try {
    const project = await projectRepository.getById(id);
    if (!project) {
      return left('project-not-found');
    }

    if (project.ownerId !== userId) {
      return left('forbidden');
    }

    await projectRepository.delete(id);
    return right({ id });
  } catch (error) {
    console.error('Ошибка при удалении проекта:', error);
    return left('unknown-error');
  }
};
