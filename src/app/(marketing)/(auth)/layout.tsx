import { ReactNode } from 'react';
import { AuthClientLayout } from './auth-layout';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AuthClientLayout>{children}</AuthClientLayout>;
}
