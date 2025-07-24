import { Button } from '@/shared/ui/button';
import { logout } from '../actions/logout';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
  return (
    <form action={logout}>
      <Button variant={'outline'} type="submit">
        <LogOut />
      </Button>
    </form>
  );
};
