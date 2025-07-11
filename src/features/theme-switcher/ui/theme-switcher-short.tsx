'use client';
import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { ThemeIcon, ThemeNameType } from './theme-icon';
import { THEMES } from '../constants';

export const ThemeSwitcherShort = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <div className="h-5 w-9"></div>;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ThemeIcon name={theme as ThemeNameType} />
          <span className="sr-only">Переключить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
        <DropdownMenuItem onClick={() => setTheme(THEMES.light)}>
          <ThemeIcon name={THEMES.light} /> Светлая тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.dark)}>
          <ThemeIcon name={THEMES.dark} /> Темная тема
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
