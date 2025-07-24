'use server';
import { sessionService } from '@/entities/user/server';
import { PATHNAMES } from '@/shared/constants/pathnames';
import { redirect } from 'next/navigation';

export const logout = async () => {
  await sessionService.deleteSession();
  redirect(PATHNAMES.LOGIN);
};
