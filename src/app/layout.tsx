import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/features/theme-switcher';
import { THEMES } from '@/features/theme-switcher/constants';

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} scroll-smooth antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem value={THEMES}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
