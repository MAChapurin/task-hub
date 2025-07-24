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
  };
}) {
  const loginId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const emailId = useId();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type="text"
          name="login"
          placeholder="Enter your login"
          required
          defaultValue={formData?.get('login')?.toString()}
        />
        {errors?.login && <div className="text-red-500 text-sm">{errors.login}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={emailId}>Email</Label>
        <Input
          id={emailId}
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          defaultValue={formData?.get('email')?.toString()}
        />
        {errors?.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          defaultValue={formData?.get('password')?.toString()}
        />
        {errors?.password && <div className="text-red-500 text-sm">{errors.password}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={confirmPasswordId}>Confirm Password</Label>
        <Input
          id={confirmPasswordId}
          type="password"
          name="confirmPassword"
          placeholder="Repeat your password"
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
