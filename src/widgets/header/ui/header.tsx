import { LogoutButton } from '@/features/account/ui/logout-button';
import { ThemeSwitcher } from '@/features/theme-switcher/ui/theme-switcher';
import { Button } from '@/shared/ui/button';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { AsideMessagesDrawer } from '@/widgets/aside-messages';
import { SearchDialog } from '@/widgets/search';

import { Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex flex-col-reverse md:flex-row gap-4 items-center p-4">
      <div className="ml-auto flex items-center gap-4">
        <AsideMessagesDrawer />
        <LogoutButton />
        <SearchDialog />
        <Button size={'icon'} variant={'outline'}>
          <Bell />
        </Button>
        <ThemeSwitcher />
        <SidebarTrigger />
      </div>
    </header>
  );
};
