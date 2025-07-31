import { prisma } from '@/shared/lib/db';

export const messageRepository = {
  send: (senderId: string, receiverId: string, content: string) =>
    prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    }),

  getConversation: (userId: string, otherUserId: string) =>
    prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),
};
