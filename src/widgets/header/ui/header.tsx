import { FormSearch } from '@/features/search';
import { ThemeSwitcher } from '@/features/theme-switcher/ui/theme-switcher';
import { Button } from '@/shared/ui/button';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex flex-col-reverse md:flex-row gap-4 items-center p-4">
      <h1 className="font-semibold text-4xl w-fit">Dashboard</h1>
      <div className="ml-auto flex items-center gap-4">
        <FormSearch />
        <Button size={'icon'} variant={'outline'} className="">
          <Bell />
        </Button>
        <ThemeSwitcher />
        <SidebarTrigger />
      </div>
    </header>
  );
};
