'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { ReactNode } from 'react';
import { cn } from '@/shared/lib/css';

export function TaskDrawer({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  const open = !!projectId;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('projectId');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent
        className={cn(
          'min-h-[50dvh]',
          'sm:max-w-full sm:bottom-0 sm:top-auto sm:translate-y-0',
          'sm:rounded-t-lg sm:rounded-b-none sm:w-full sm:max-h-[80vh]',
          'sm:flex sm:flex-col',
          'transition-transform'
        )}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Задачи проекта</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
