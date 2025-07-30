'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/shared/ui/drawer';
import { ReactNode } from 'react';

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
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Проект {projectId}</DrawerTitle>
          <DrawerDescription>Контент проекта или подробности</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
