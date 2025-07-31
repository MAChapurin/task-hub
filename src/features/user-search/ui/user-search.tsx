'use client';

import React, { useState } from 'react';

export interface User {
  id: string;
  name: string;
}

interface UserSearchProps {
  users: User[];
  currentUserId: string;
  onSelect: (user: User) => void;
}

export function UserSearch({ users, currentUserId, onSelect }: UserSearchProps) {
  const [query, setQuery] = useState('');
  const filteredUsers = users.filter(
    (user) => user.id !== currentUserId && user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск пользователя..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      {filteredUsers.length === 0 ? (
        <p className="">Пользователи не найдены</p>
      ) : (
        <ul className="max-h-full overflow-auto border rounded">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => onSelect(user)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
