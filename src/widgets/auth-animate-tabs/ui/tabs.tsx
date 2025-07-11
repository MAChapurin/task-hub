'use client';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from '@/shared/animate-ui/radix/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { PATHNAMES } from '@/shared/constants/pathnames';
import { LoginForm, RegistrationForm } from '@/features/auth';

export const AuthAnimateTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === PATHNAMES.LOGIN) {
      router.push(PATHNAMES.LOGIN);
    } else if (tab === PATHNAMES.REGISTER) {
      router.push(PATHNAMES.REGISTER);
    }
  };
  return (
    <Tabs value={pathname} className="w-full bg-muted rounded-lg" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={PATHNAMES.LOGIN}>Вход</TabsTrigger>
        <TabsTrigger value={PATHNAMES.REGISTER}>Регистрация</TabsTrigger>
      </TabsList>

      <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-background">
        <TabsContent value={PATHNAMES.LOGIN} className="space-y-2 p-2 md:space-y-6 md:p-6">
          <LoginForm />
        </TabsContent>
        <TabsContent value={PATHNAMES.REGISTER} className="space-y-2 p-2 md:space-y-6 md:p-6">
          <RegistrationForm />
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
};
