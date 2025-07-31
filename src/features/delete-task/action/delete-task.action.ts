'use server';

import { deleteTask } from '@/entities/task/services/delete-task';

export type DeleteTaskFormState = {
  errors?: Record<string, string>;
};

const errorMessages = {
  'task-not-found': 'Задача не найдена',
  'unknown-error': 'Неизвестная ошибка',
};

export const deleteTaskAction = async (
  _prev: DeleteTaskFormState,
  formData: FormData
): Promise<DeleteTaskFormState> => {
  const id = formData.get('id');
  if (typeof id !== 'string') {
    return { errors: { _form: 'Некорректный ID задачи' } };
  }

  const result = await deleteTask({ id });

  if (result.type === 'right') {
    return {};
  } else {
    return {
      errors: {
        _form:
          errorMessages[result.error as keyof typeof errorMessages] ??
          errorMessages['unknown-error'],
      },
    };
  }
};
