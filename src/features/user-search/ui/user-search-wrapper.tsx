'use client';

import { useRouter } from 'next/navigation';
import { UserSearch, User } from '@/features/user-search/ui/user-search';

interface UserSearchWrapperProps {
  users: User[];
  currentUserId: string;
}

export function UserSearchWrapper({ users, currentUserId }: UserSearchWrapperProps) {
  const router = useRouter();

  return (
    <UserSearch
      users={users}
      currentUserId={currentUserId}
      onSelect={(user) => {
        router.push(`/message?with=${user.id}`);
      }}
    />
  );
}
