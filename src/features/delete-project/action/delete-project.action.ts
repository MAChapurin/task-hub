'use server';

import { deleteProject } from '@/entities/project/services/delete-project';
import { getCurrentUser } from '@/entities/user/server';

type ErrorKeys = 'project-not-found' | 'forbidden' | 'unknown-error';

const errorMessages: Record<ErrorKeys, string> = {
  'project-not-found': 'Проект не найден',
  forbidden: 'Удалять проект может только владелец',
  'unknown-error': 'Неизвестная ошибка',
};

export type DeleteProjectFormState = {
  errors?: Record<string, string>;
};

export const deleteProjectAction = async (
  _prev: DeleteProjectFormState,
  formData: FormData
): Promise<DeleteProjectFormState> => {
  const user = await getCurrentUser();
  if (!user) {
    return { errors: { _form: 'Пользователь не найден' } };
  }

  const id = formData.get('id');
  if (typeof id !== 'string') {
    return { errors: { _form: 'Некорректный ID проекта' } };
  }

  const result = await deleteProject({ id, userId: user.id });

  if (result.type === 'right') {
    return {};
  } else {
    return {
      errors: {
        _form: errorMessages[result.error as ErrorKeys] ?? errorMessages['unknown-error'],
      },
    };
  }
};
