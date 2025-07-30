'use client';

import { cn } from '@/shared/lib/css';
import { ClickCatcherWrapperProps } from '../types/project-list.types';

export function ClickCatcherWrapper({ children, className }: ClickCatcherWrapperProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
