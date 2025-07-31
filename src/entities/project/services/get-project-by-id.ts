import { ProjectWithParticipants } from '../domain';
import { projectRepository } from '../repositories/project.repository';
import { Either, left, right } from '@/shared/lib/either';

export const getProjectById = async (
  id: string
): Promise<Either<'project-not-found' | 'unknown-error', ProjectWithParticipants>> => {
  try {
    if (!id) {
      console.warn('Пустой ID проекта передан в getProjectById');
      return left('project-not-found');
    }

    const project = await projectRepository.getById(id);

    if (!project) {
      return left('project-not-found');
    }

    return right(project);
  } catch (error) {
    console.error(`Ошибка при получении проекта по ID "${id}":`, error);
    return left('unknown-error');
  }
};
