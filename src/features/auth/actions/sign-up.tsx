'use server';

import { createUser, sessionService } from '@/entities/user/server';
import { PATHNAMES } from '@/shared/constants/pathnames';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type SignUnFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    surname?: string;
    _errors?: string;
  };
};

const formDataSchema = z
  .object({
    login: z.string().min(3),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
    email: z.string().email('Некорректный email'),
    name: z.string().min(1, 'Имя обязательно'),
    surname: z.string().min(1, 'Фамилия обязательна'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const signUpAction = async (
  _state: SignUnFormState,
  formData: FormData
): Promise<SignUnFormState> => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formatedErrors = result.error.format();
    return {
      formData,
      errors: {
        login: formatedErrors.login?._errors.join(', '),
        password: formatedErrors.password?._errors.join(', '),
        confirmPassword: formatedErrors.confirmPassword?._errors.join(', '),
        email: formatedErrors.email?._errors.join(', '),
        name: formatedErrors.name?._errors.join(', '),
        surname: formatedErrors.surname?._errors.join(', '),
        _errors: formatedErrors._errors?.join(', '),
      },
    };
  }

  const { login, password, email, name, surname } = result.data;

  const createUserResult = await createUser({
    login,
    password,
    email,
    name,
    surname,
    avatarUrl: null,
  });

  if (createUserResult.type === 'right') {
    await sessionService.addSession(createUserResult.value);
    redirect(PATHNAMES.DASHBOARD);
  }

  const errors = {
    'user-login-exists': 'Пользователь с таким login существует',
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};
