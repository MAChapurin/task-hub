import type { Metadata } from 'next';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from '@/shared/ui/sidebar';

import { cookies } from 'next/headers';

import { AppSidebar, Header } from '@/widgets';
import { getCurrentUser } from '@/entities/user/server';
import { UserAccountClient } from '@/features/account/ui/user-account-client';
import { getProjectsByUser } from '@/entities/project/server';
import { matchEither } from '@/shared/lib/either';

const SITE_NAME = 'Task Hub';

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const projectsResult = await getProjectsByUser(user?.id || '');
  const projects = matchEither(projectsResult, {
    left: () => null,
    right: (p) => p,
  });

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen w-full overflow-x-hidden">
        <AppSidebar
          projects={projects}
          accountSlot={
            <SidebarGroup>
              <SidebarGroupLabel>Аккаунт</SidebarGroupLabel>
              <SidebarGroupContent>
                <UserAccountClient
                  email={user?.email || ''}
                  login={`${user?.name} ${user?.surname}`}
                />
              </SidebarGroupContent>
            </SidebarGroup>
          }
        />

        <div className="flex flex-col w-full min-w-0">
          <Header />
          <main className="grow min-w-0" role="main">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
