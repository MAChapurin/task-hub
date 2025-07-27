import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  dueDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    {
      message: 'Некорректная дата',
    }
  ),
  icon: z.string().min(1, 'Иконка обязательна'),
});

export type CreateProjectSchema = typeof createProjectSchema;
