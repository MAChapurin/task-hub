'use client';

import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

import { useTheme } from 'next-themes';
import { THEME_VALUES } from '../constants';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const id = useId();
  console.log(theme);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <div className="w-[4rem] h-6"></div>;
  return (
    <div className="flex items-center space-x-2">
      <Label className="cursor-pointer" htmlFor={id}>
        <Switch
          className="cursor-pointer"
          id={id}
          onCheckedChange={() => {
            setTheme((prev) =>
              prev === THEME_VALUES.LIGHT ? THEME_VALUES.DARK : THEME_VALUES.LIGHT
            );
          }}
        />
        {theme === THEME_VALUES.DARK ? <Sun /> : <Moon />}
      </Label>
    </div>
  );
};
