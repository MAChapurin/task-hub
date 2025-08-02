'use client';

import { ChatSummary } from '@/shared/types/chat';
import { useState, useEffect } from 'react';
import ChatListSidebar from './ChatListSidebar';
import ChatRoom from './ChatRoom';
import { Input } from '@/shared/ui/input';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface ChatLayoutProps {
  chats: ChatSummary[];
  currentUserId: string;
}

export default function ChatLayout({ chats, currentUserId }: ChatLayoutProps) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    fetch(`/api/users/search?q=${encodeURIComponent(searchTerm)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: User[]) => setSearchResults(data))
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [searchTerm]);

  async function startChatWithUser(userId: string) {
    try {
      const res = await fetch('/api/chats/create-or-get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId, otherUserId: userId }),
      });
      if (!res.ok) throw new Error('Failed to start chat');
      const chat = await res.json();

      setActiveChatId(chat.id);
      setSearchTerm('');
      setSearchResults([]);
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <div className="flex h-[calc(100vh_-100px)] border rounded overflow-hidden">
      <div className="flex flex-col flex-1 h-full">
        {activeChatId ? (
          <ChatRoom chatId={activeChatId} currentUserId={currentUserId} />
        ) : (
          <div className="flex items-center justify-center flex-1 text-muted-foreground">
            Выберите чат или найдите пользователя для начала общения
          </div>
        )}
      </div>
      <div className="w-[320px] border-r flex flex-col h-full">
        <Input
          type="text"
          placeholder="Найти пользователя..."
          className="p-2 border-b border-r-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm.trim() ? (
          <ScrollArea className="flex-1 min-h-0">
            {loading ? (
              <div className="p-2 text-sm text-muted-foreground">Загрузка...</div>
            ) : searchResults.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground">Пользователи не найдены</div>
            ) : (
              searchResults.map((user) => (
                <Button
                  key={user.id}
                  variant="ghost"
                  onClick={() => startChatWithUser(user.id)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <Avatar>
                    {user.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                    ) : (
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>{user.name}</span>
                </Button>
              ))
            )}
          </ScrollArea>
        ) : (
          <ChatListSidebar
            chats={chats}
            currentUserId={currentUserId}
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
          />
        )}
      </div>
    </div>
  );
}
