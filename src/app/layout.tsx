import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/sidebar/ui/sidebar';
import { cookies } from 'next/headers';
import { Header } from '@/widgets/header';
import { ThemeProvider } from '@/features/theme-switcher';
import { THEMES } from '@/features/theme-switcher/constants';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/resizable';

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
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] border md:min-w-[450px]"
              >
                <ResizablePanel defaultSize={75}>
                  <Header />
                  <main className="p-4">{children}</main>
                </ResizablePanel>
                <ResizableHandle withHandle className="hidden lg:flex" />
                <ResizablePanel defaultSize={25} className="hidden lg:flex">
                  <div className="flex h-full items-center justify-center p-6 bg-violet-400 bg-[url(/message-bg.jpeg)] bg-top bg-no-repeat bg-contain w-full aspect-[16/9]">
                    <span className="font-semibold">Messages</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
