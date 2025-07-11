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

        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
