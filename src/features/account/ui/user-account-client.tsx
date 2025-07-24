'use client';

import { Select, SelectTrigger, SelectValue, SelectContent } from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';
import { ProfileItem } from '@/features/account/ui/profile-item';
import { logout } from '../actions/logout';

export function UserAccountClient({ email, login }: { email: string; login: string }) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            <ProfileItem src="https://github.com/evilrabbit.png" name={login} mail={email} />
          }
        />
      </SelectTrigger>
      <SelectContent>
        <form action={logout}>
          <Button className="w-full" type="submit">
            Sign out
          </Button>
        </form>
      </SelectContent>
    </Select>
  );
}
