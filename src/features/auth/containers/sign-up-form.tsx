'use client';

import { AuthFormLayout } from '../ui/auth-form-layout';
import { SubmitButton } from '../ui/submit-button';

import { BottomLink } from '../ui/link';
import { ErrorMessage } from '../ui/submit-button copy';
import { useActionState } from '@/shared/lib/react';
import { SignUnFormState, signUpAction } from '../actions/sign-up';
import { PATHNAMES } from '@/shared/constants/pathnames';
import { AuthFieldsRegister } from '../ui/sign-up-fields';

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(signUpAction, {} as SignUnFormState);

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started"
      action={action}
      fields={<AuthFieldsRegister {...formState} />}
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={<BottomLink text="Already have an account?" linkText="Sign in" url={PATHNAMES.LOGIN} />}
    />
  );
}
