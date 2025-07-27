import { z } from 'zod';

export const editProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Название обязательно'),
  dueDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date.getTime() > Date.now();
    },
    { message: 'Дата должна быть из будущего' }
  ),
  icon: z.string().min(1, 'Иконка обязательна'),
});

export type EditProjectSchema = typeof editProjectSchema;
