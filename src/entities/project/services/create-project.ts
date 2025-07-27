import { left, right, Either } from '@/shared/lib/either';
import { projectRepository } from '../repositories/project.repository';

export const createProject = async ({
  title,
  dueDate,
  icon,
  ownerId,
  participantIds = [],
}: {
  title: string;
  dueDate: Date;
  icon: string;
  ownerId: string;
  participantIds?: string[];
}): Promise<
  Either<'project-title-already-exists' | 'invalid-due-date' | 'unknown-error', { id: string }>
> => {
  try {
    const existingProjects = await projectRepository.getByUserId(ownerId);
    const duplicate = existingProjects.find(
      (p) => p.title.toLowerCase() === title.toLowerCase() && p.ownerId === ownerId
    );
    if (duplicate) {
      return left('project-title-already-exists');
    }

    const now = new Date();
    if (dueDate <= now) {
      return left('invalid-due-date');
    }

    const project = await projectRepository.create({
      title,
      dueDate,
      icon,
      ownerId,
      participantIds,
    });

    return right({ id: project.id });
  } catch (error) {
    console.error('Ошибка при создании проекта:', error);
    return left('unknown-error');
  }
};
