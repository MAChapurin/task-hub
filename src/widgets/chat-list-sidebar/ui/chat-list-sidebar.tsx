'use client';

import { useState } from 'react';
import Link from 'next/link';

import { ScrollArea } from '@/shared/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { UserSearchBox } from '@/features/users-search-box/ui/users-search-box';
import { ChatEntity } from '@/entities/chat/domain';
import { useChatSidebarSubscription } from '../hooks/useChatSidebarSubscription';
import { TimeAgo } from './time-ago';

interface ChatListSidebarProps {
  chatList: ChatEntity[];
  currentUserId: string;
  selectedChatId: string | null;
}

export function ChatListSidebar({ chatList, currentUserId, selectedChatId }: ChatListSidebarProps) {
  const [chatItems, setChatItems] = useState(chatList);

  useChatSidebarSubscription(chatItems, (chatId, newMessage) => {
    setChatItems((prevChats) =>
      prevChats
        .map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                lastMessage: {
                  id: newMessage.id,
                  content: newMessage.content,
                  createdAt: newMessage.createdAt,
                },
              }
            : chat
        )
        .sort(
          (a, b) =>
            new Date(b.lastMessage?.createdAt ?? 0).getTime() -
            new Date(a.lastMessage?.createdAt ?? 0).getTime()
        )
    );
  });

  return (
    <aside className="flex flex-col w-[320px] h-[calc(100vh-68px)] border-r bg-sidebar text-sidebar-foreground border-sidebar-border">
      <header className="h-16 p-4 text-lg font-semibold border-b border-[var(--sidebar-border)] select-none">
        Чаты
      </header>

      <UserSearchBox currentUserId={currentUserId} />

      <ScrollArea className="flex-1 min-h-0">
        <ul className="divide-y divide-[var(--sidebar-border)]">
          {chatItems.map((chat) => {
            const companion = chat.participants.find((user) => user.id !== currentUserId);
            const lastMessage = chat.lastMessage;
            const isSelected = chat.id === selectedChatId;

            return (
              <li key={chat.id}>
                <Link
                  href={`/chats/${chat.id}`}
                  className={`flex items-start gap-3 p-3 w-full text-left rounded-none h-fit
                    ${isSelected ? 'bg-secondary text-secondary-foreground' : ''}
                    hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)]`}
                >
                  <Avatar className="shrink-0">
                    {companion?.avatarUrl ? (
                      <AvatarImage src={companion.avatarUrl} alt={companion.name} />
                    ) : (
                      <AvatarFallback>{companion?.name?.[0] ?? '?'}</AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium truncate m-0" title={companion?.name}>
                        {companion?.name}
                      </h4>
                      {lastMessage?.createdAt && <TimeAgo date={new Date(lastMessage.createdAt)} />}
                    </div>

                    <p
                      className="text-xs truncate mt-1 mb-0 text-[var(--muted-foreground)]"
                      title={lastMessage?.content ?? ''}
                    >
                      {lastMessage?.content ?? 'Нет сообщений'}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </aside>
  );
}
