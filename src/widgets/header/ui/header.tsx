import { FormSearch } from '@/features/search';
import { ThemeSwitcher } from '@/features/theme-switcher/ui/theme-switcher';
import { Button } from '@/shared/ui/button';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex gap-4 items-center p-4">
      <SidebarTrigger />
      <ThemeSwitcher />
      <h1 className="mr-auto">Dashboard</h1>
      <FormSearch />
      <Button size={'icon'} variant={'outline'} className="">
        <Bell />
      </Button>
    </header>
  );
};
