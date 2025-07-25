'use client';
import { PATHNAMES } from '@/shared/constants/pathnames';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { AuthAnimateTabs } from '@/widgets/auth-animate-tabs';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function AuthClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const handleClose = () => {
    router.replace(PATHNAMES.HOME);
  };

  const isOpen = pathname === PATHNAMES.LOGIN || pathname === PATHNAMES.REGISTER;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Вход в систему</DialogTitle>
        </DialogHeader>
        <AuthAnimateTabs />
        {children}
      </DialogContent>
    </Dialog>
  );
}
