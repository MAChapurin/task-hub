import { ScrollArea } from '@/shared/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChatSummary } from '@/shared/types/chat';
import Link from 'next/link';

export function ChatListSidebar({
  chats,
  currentUserId,
  activeChatId,
}: {
  chats: ChatSummary[];
  currentUserId: string;
  activeChatId: string | null;
}) {
  return (
    <div className="flex flex-col w-[320px] h-[calc(100vh-68px)] border-r bg-sidebar text-sidebar-foreground border-sidebar-border">
      <div className="p-4 text-lg font-semibold border-b border-[var(--sidebar-border)] select-none">
        Чаты
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="divide-y divide-[var(--sidebar-border)]">
          {chats.map((chat) => {
            console.log('chat => ', chat);
            const other = chat.participants.find((u) => u.id !== currentUserId);
            const lastMsg = chat.lastMessage;
            const isActive = activeChatId === chat.id;

            return (
              <Link
                key={chat.id}
                href={`/chats/${chat.id}`}
                className={`h-fit rounded-none flex items-start gap-3 p-3 w-full text-left
                ${isActive ? 'bg-secondary text-secondary-foreground' : ''}
                hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)]
              `}
              >
                <Avatar className="shrink-0">
                  {other?.avatarUrl ? (
                    <AvatarImage src={other.avatarUrl} alt={other.name} />
                  ) : (
                    <AvatarFallback>{other?.name?.[0] ?? '?'}</AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium truncate m-0" title={other?.name}>
                      {other?.name}
                    </h4>
                    <span
                      className="text-xs text-[var(--sidebar-accent-foreground)] whitespace-nowrap ml-2"
                      title={lastMsg?.createdAt ? new Date(lastMsg.createdAt).toLocaleString() : ''}
                    >
                      {lastMsg?.createdAt
                        ? formatDistanceToNow(new Date(lastMsg.createdAt), {
                            addSuffix: true,
                            locale: ru,
                          })
                        : ''}
                    </span>
                  </div>

                  <p
                    className="text-xs truncate mt-1 mb-0 text-[var(--muted-foreground)]"
                    title={lastMsg?.content}
                  >
                    {lastMsg?.content ?? 'Нет сообщений'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
