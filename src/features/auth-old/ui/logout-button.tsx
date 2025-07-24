'use client';

import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  return <Button onClick={handleLogout}>Выйти</Button>;
}
