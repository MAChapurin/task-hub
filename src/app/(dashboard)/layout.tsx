import type { Metadata } from 'next';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from '@/shared/ui/sidebar';

import { cookies } from 'next/headers';

import { AppSidebar, AsidePanel, Header } from '@/widgets';
import { getCurrentUser } from '@/entities/user/server';
import { UserAccountClient } from '@/features/account/ui/user-account-client';

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

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        accountSlot={
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <UserAccountClient
                email={user?.email || ''}
                login={`${user?.name} ${user?.surname}`}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        }
      />
      <div className="w-full">
        <div className="xl:flex">
          <div className="md:grow">
            <Header />
            <main className="p-4">{children}</main>
          </div>
          <AsidePanel />
        </div>
      </div>
    </SidebarProvider>
  );
}
