'use server';

import { createProject } from '@/entities/project/services/create-project';
import { getCurrentUser } from '@/entities/user/server';
import { createProjectSchema } from '../model/create-project.schema';

export type CreateProjectFormState = {
  errors?: Record<string, string>;
};

export const createProjectAction = async (
  _prev: CreateProjectFormState,
  formData: FormData
): Promise<CreateProjectFormState> => {
  const user = await getCurrentUser();
  if (!user) {
    return { errors: { _form: 'Пользователь не найден' } };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = createProjectSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const formattedErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, val]) => [key, val?.join(', ') || ''])
    );

    return { errors: formattedErrors };
  }

  const result = await createProject({
    ...parsed.data,
    dueDate: new Date(parsed.data.dueDate),
    ownerId: user.id,
  });

  const errorMessages: Record<string, string> = {
    'project-title-already-exists': 'Проект с таким названием уже существует',
    'invalid-due-date': 'Дата завершения должна быть в будущем',
    'unknown-error': 'Неизвестная ошибка',
  };

  if (result.type === 'left') {
    return {
      errors: {
        _form: errorMessages[result.error] ?? errorMessages['unknown-error'],
      },
    };
  }

  return {};
};
