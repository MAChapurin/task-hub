import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import React, { useId } from 'react';

export function AuthFieldsRegister({
  errors,
  formData,
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    surname?: string;
  };
}) {
  const loginId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const nameId = useId();
  const surnameId = useId();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Логин</Label>
        <Input
          id={loginId}
          name="login"
          required
          defaultValue={formData?.get('login')?.toString()}
        />
        {errors?.login && <div className="text-red-500 text-sm">{errors.login}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={emailId}>Почта</Label>
        <Input
          id={emailId}
          type="email"
          name="email"
          required
          defaultValue={formData?.get('email')?.toString()}
        />
        {errors?.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={nameId}>Имя</Label>
        <Input id={nameId} name="name" required defaultValue={formData?.get('name')?.toString()} />
        {errors?.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={surnameId}>Фамилия</Label>
        <Input
          id={surnameId}
          name="surname"
          required
          defaultValue={formData?.get('surname')?.toString()}
        />
        {errors?.surname && <div className="text-red-500 text-sm">{errors.surname}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={passwordId}>Пароль</Label>
        <Input
          id={passwordId}
          type="password"
          name="password"
          required
          defaultValue={formData?.get('password')?.toString()}
        />
        {errors?.password && <div className="text-red-500 text-sm">{errors.password}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={confirmPasswordId}>Повторите пароль</Label>
        <Input
          id={confirmPasswordId}
          type="password"
          name="confirmPassword"
          required
          defaultValue={formData?.get('confirmPassword')?.toString()}
        />
        {errors?.confirmPassword && (
          <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
        )}
      </div>
    </>
  );
}
