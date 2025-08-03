import { sessionService } from '@/entities/user/server';
import { ChatSummary } from '@/shared/types/chat';
import { prisma } from '@/shared/lib/db';
import { ChatListSidebar } from '@/widgets/chat-list-sidebar';

async function getUserChats(userId: string): Promise<ChatSummary[]> {
  const chats = await prisma.chat.findMany({
    where: {
      participants: {
        some: {
          userId,
        },
      },
    },
    include: {
      lastMessage: {
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      },
      participants: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return chats.map((chat) => ({
    id: chat.id,
    lastMessage: chat.lastMessage
      ? {
          id: chat.lastMessage.id,
          content: chat.lastMessage.content,
          createdAt: chat.lastMessage.createdAt.toISOString(),
        }
      : undefined,
    participants: chat.participants.map((p) => ({
      id: p.user.id,
      name: p.user.name,
      avatarUrl: p.user.avatarUrl ?? null,
    })),
  }));
}

export default async function ChatsLayout({ children }: { children: React.ReactNode }) {
  const { session } = await sessionService.verifySession();
  const currentUserId = session.id;
  const chats = await getUserChats(currentUserId);

  return (
    <div className="flex  h-[calc(100vh-68px)]">
      <main className="flex-1">{children}</main>
      <ChatListSidebar chats={chats} currentUserId={currentUserId} activeChatId={null} />
    </div>
  );
}
