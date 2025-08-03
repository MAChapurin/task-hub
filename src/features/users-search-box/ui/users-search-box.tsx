'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';

type User = {
  id: string;
  name: string;
  avatarUrl?: string | null;
};

export function UserSearchBox({ currentUserId }: { currentUserId: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        setIsLoading(true);
        fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then(setResults)
          .finally(() => setIsLoading(false));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  async function handleUserClick(user: User) {
    const res = await fetch('/api/chats/create-or-get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUserId, otherUserId: user.id }),
    });

    const data = await res.json();
    router.push(`/chats/${data.id}`);
  }

  return (
    <div className="border-b border-[var(--sidebar-border)]">
      <div className="p-3">
        <Input
          placeholder="Поиск пользователя..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <div className="divide-y divide-[var(--sidebar-border)]">
          {results.map((user) => (
            <button
              disabled={isLoading}
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`w-full text-left flex items-start gap-3 p-3
                hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)] disabled:opacity-75`}
            >
              <Avatar className="shrink-0">
                {user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                )}
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium truncate m-0" title={user.name}>
                    {user.name}
                  </h4>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-1 mb-0">
                  Нажмите, чтобы начать чат
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
