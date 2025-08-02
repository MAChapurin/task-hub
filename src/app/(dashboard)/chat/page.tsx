// src/app/(dashboard)/chat/page.tsx

import { prisma } from '@/shared/lib/db';
import { ChatSummary } from '@/shared/types/chat';
import ChatLayout from './ChatLayout';
import { sessionService } from '@/entities/user/server';

async function getUserChats(userId: string): Promise<ChatSummary[]> {
  const participantChats = await prisma.chatParticipant.findMany({
    where: { userId },
    include: {
      chat: {
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
      },
    },
  });

  return participantChats.map((p) => ({
    id: p.chat.id,
    lastMessage: p.chat.lastMessage
      ? {
          id: p.chat.lastMessage.id,
          content: p.chat.lastMessage.content,
          createdAt: p.chat.lastMessage.createdAt.toISOString(),
        }
      : undefined,
    participants: p.chat.participants.map((cp) => cp.user),
  }));
}

export default async function ChatPage() {
  const { session } = await sessionService.verifySession();
  const currentUserId = session.id;
  const chats = await getUserChats(currentUserId);
  return <ChatLayout chats={chats} currentUserId={currentUserId} />;
}
