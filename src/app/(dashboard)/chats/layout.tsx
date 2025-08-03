import { sessionService } from '@/entities/user/server';
import { getUserChatsById } from '@/entities/chat/services/get-user-chats-by-id';
import { ChatListSidebar } from '@/widgets/chat-list-sidebar';
import { PropsWithChildren } from 'react';

export default async function ChatsLayout({ children }: PropsWithChildren) {
  const { session } = await sessionService.verifySession();
  const currentUserId = session.id;
  const chats = await getUserChatsById(currentUserId);

  return (
    <div className="flex  h-[calc(100vh-68px)]">
      <div className="flex-1">{children}</div>
      <ChatListSidebar chats={chats} currentUserId={currentUserId} activeChatId={null} />
    </div>
  );
}
