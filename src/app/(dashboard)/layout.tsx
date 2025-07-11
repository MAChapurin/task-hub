import type { Metadata } from 'next';

import { SidebarProvider } from '@/shared/ui/sidebar';

import { cookies } from 'next/headers';

import { AppSidebar, AsidePanel, Header } from '@/widgets';

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
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
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
