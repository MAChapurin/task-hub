'use server';

import { createTask } from '@/entities/task/services/create-task';
import { createTaskSchema, CreateTaskFormState } from '../model/create-task.schema';

export const createTaskAction = async (
  _prev: CreateTaskFormState,
  formData: FormData,
  projectId: string
): Promise<CreateTaskFormState> => {
  const raw = Object.fromEntries(formData.entries());

  const parsed = createTaskSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const formattedErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, val]) => [key, val?.join(', ') || ''])
    );

    return { errors: formattedErrors };
  }

  const result = await createTask({
    title: parsed.data.title,
    durationHours: Number(parsed.data.durationHours),
    projectId,
  });

  const errorMessages: Record<string, string> = {
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
