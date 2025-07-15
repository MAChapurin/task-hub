import { Select, SelectContent, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { ProfileItem } from './profile-item';
import { LogoutButton } from '@/features/auth';

export function SelectAccount() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            <ProfileItem
              src="https://github.com/evilrabbit.png"
              name="Rabbit Evil"
              mail="example@mail.com"
            />
          }
        />
      </SelectTrigger>
      <SelectContent>
        <LogoutButton />
      </SelectContent>
    </Select>
  );
}
