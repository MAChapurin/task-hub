'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
}

interface Props {
  users: User[];
  currentUserId: string;
}

export function UserSearch({ users, currentUserId }: Props) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = users.filter(
    (u) => u.id !== currentUserId && u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Поиск пользователя..."
        className="w-full px-4 py-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length > 0 && (
        <ul className="mt-2 border rounded divide-y">
          {filtered.map((user) => (
            <li
              key={user.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/message?with=${user.id}`)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
