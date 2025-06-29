'use client';

import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import React from 'react';
import { AsidePanel } from './aside-panel';
import { MessageCircleMore } from 'lucide-react';

export function AsideMessagesDrawer() {
  return (
    <div className="xl:hidden">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" size={'icon'}>
            <MessageCircleMore />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle>Messages</DrawerTitle>
          </DrawerHeader>
          <AsidePanel className="w-full block" />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
