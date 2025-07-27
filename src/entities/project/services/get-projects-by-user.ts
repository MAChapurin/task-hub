import { projectRepository } from '../repositories/project.repository';
import { Either, left, right } from '@/shared/lib/either';
import { ProjectWithParticipants } from '../domain';

export const getProjectsByUser = async (
  userId: string
): Promise<Either<'unknown-error', ProjectWithParticipants[]>> => {
  try {
    const projects = await projectRepository.getByUserId(userId);
    return right(projects);
  } catch (error) {
    console.error('Ошибка при получении проектов пользователя:', error);
    return left('unknown-error');
  }
};
