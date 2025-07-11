import { ThemeSwitcherShort } from '@/features/theme-switcher';
import { PATHNAMES } from '@/shared/constants/pathnames';
import Link from 'next/link';
import { Grid3x3 } from 'lucide-react';
import { MobileMenu } from './mobile-menu';
import NavigationMenuWithActiveItem from './nav-desktop';
import { Button } from '@/shared/ui/button';

export const HeaderMarketing = () => {
  return (
    <header className="w-screen fixed z-50 top-0 left-0 flex items-center justify-center backdrop-blur-md">
      <div className="w-full max-w-400 flex items-center justify-between p-2 md:p-4 gap-8">
        <Link className="flex items-center gap-2" href={PATHNAMES.HOME}>
          <span className="sr-only">Home</span>
          <Grid3x3 /> TASKHUB
        </Link>
        <div className="hidden lg:block mr-auto">
          <NavigationMenuWithActiveItem />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Link href={PATHNAMES.LOGIN}>
            <Button>Вход</Button>
          </Link>
          <Link href={PATHNAMES.REGISTER}>
            <Button variant={'outline'}>Регистрация</Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherShort />
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
