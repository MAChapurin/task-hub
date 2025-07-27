import { projectRepository } from '../repositories/project.repository';
import { Either, left, right } from '@/shared/lib/either';

type UpdateProjectInput = {
  id: string;
  title?: string;
  dueDate?: Date;
  icon?: string;
};

export const updateProject = async ({
  id,
  ...updateData
}: UpdateProjectInput): Promise<
  Either<'project-not-found' | 'invalid-due-date' | 'unknown-error', { id: string }>
> => {
  try {
    const existingProject = await projectRepository.getById(id);
    if (!existingProject) {
      return left('project-not-found');
    }

    if (updateData.dueDate && updateData.dueDate <= new Date()) {
      return left('invalid-due-date');
    }

    const updated = await projectRepository.update(id, updateData);
    return right({ id: updated.id });
  } catch (error) {
    console.error('Ошибка при обновлении проекта:', error);
    return left('unknown-error');
  }
};
