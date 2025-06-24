'use client';

import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-[4rem] h-6"></div>;
  return (
    <div className="flex items-center space-x-2">
      <Label className="cursor-pointer" htmlFor="airplane-mode">
        <Switch
          className="cursor-pointer"
          id="airplane-mode"
          onCheckedChange={() => {
            setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
          }}
        />
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Label>
    </div>
  );
};
