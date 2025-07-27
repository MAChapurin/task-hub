'use server';

import { updateProject } from '@/entities/project/services/update-project';
import { getCurrentUser } from '@/entities/user/server';
import { editProjectSchema } from '../model/edit-project.schema';

export type EditProjectFormState = {
  errors?: Record<string, string>;
};

export const editProjectAction = async (
  _prev: EditProjectFormState,
  formData: FormData
): Promise<EditProjectFormState> => {
  const user = await getCurrentUser();
  if (!user) {
    return { errors: { _form: 'Пользователь не найден' } };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = editProjectSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const formattedErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, val]) => [key, val?.join(', ') || ''])
    );

    return { errors: formattedErrors };
  }

  const result = await updateProject({
    id: parsed.data.id,
    title: parsed.data.title,
    dueDate: new Date(parsed.data.dueDate),
    icon: parsed.data.icon,
    status: parsed.data.status,
  });

  const errorMessages: Record<string, string> = {
    'project-not-found': 'Проект не найден',
    'invalid-due-date': 'Дата завершения должна быть из будущего',
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
