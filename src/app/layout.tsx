import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/shared/ui/sidebar';

import { cookies } from 'next/headers';

import { ThemeProvider } from '@/features/theme-switcher';
import { THEMES } from '@/features/theme-switcher/constants';
import { AppSidebar, AsidePanel, Header } from '@/widgets';
import { Toaster } from '@/shared/ui/sonner';

const SITE_NAME = 'Task Hub';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-main',
});

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'App for tasks',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem value={THEMES}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div className="w-full">
              <div className="xl:flex">
                <div className="md:grow">
                  <Header />
                  <main className="p-4">{children}</main>
                  <Toaster />
                </div>
                <AsidePanel />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
