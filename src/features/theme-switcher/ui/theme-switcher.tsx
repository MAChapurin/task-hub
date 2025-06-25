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

export const ThemeSwitcher = () => {
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
        <DropdownMenuItem onClick={() => setTheme(THEMES.green)}>
          <ThemeIcon name={THEMES.green} /> Зеленая тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.red)}>
          <ThemeIcon name={THEMES.red} /> Красная тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.blue)}>
          <ThemeIcon name={THEMES.blue} /> Синяя тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.purple)}>
          <ThemeIcon name={THEMES.purple} />
          Фиолетовая тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.pink)}>
          <ThemeIcon name={THEMES.pink} /> Розовая тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.winter)}>
          <ThemeIcon name={THEMES.winter} /> Зимняя тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.neon)}>
          <ThemeIcon name={THEMES.neon} /> Неоновая тема
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.cyberpunk)}>
          <ThemeIcon name={THEMES.cyberpunk} /> Тема Cyberpunk
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.matrix)}>
          <ThemeIcon name={THEMES.matrix} /> Тема Matrix
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.terminal)}>
          <ThemeIcon name={THEMES.terminal} /> Тема Terminal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(THEMES.umbrella)}>
          <ThemeIcon name={THEMES.umbrella} /> Тема Biohazard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
