'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import Link from 'next/link';

import { navigationMenuItems } from '../config';
import { PATHNAMES } from '@/shared/constants/pathnames';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <nav aria-label="mobile menu" className="p-4">
          <ul className="flex flex-col gap-6 text-sm">
            {navigationMenuItems.map((item) => {
              return (
                <li key={item.title}>
                  <Link href={item.href} onClick={handleClose} className="flex items-center gap-2">
                    <item.icon className="text-foreground" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col items-stretch gap-2 p-4">
          <Link href={PATHNAMES.LOGIN} className="w-full">
            <Button className="w-full">Вход</Button>
          </Link>
          <Link href={PATHNAMES.REGISTER} className="w-full">
            <Button variant={'outline'} className="w-full">
              Регистрация
            </Button>
          </Link>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Закрыть
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
