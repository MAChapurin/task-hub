import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  durationHours: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num > 0;
  }, 'Продолжительность должна быть положительным числом'),
});

export type CreateTaskFormState = {
  errors?: Record<string, string>;
};
