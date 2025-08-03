import { prisma } from '@/shared/lib/db';

export const chatRepository = {
  getUserChats: async (userId: string) => {
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
    return chats;
  },

  createChat: async (currentUserId: string, otherUserId: string) => {
    const newChat = await prisma.chat.create({
      data: {
        participants: {
          createMany: {
            data: [{ userId: currentUserId }, { userId: otherUserId }],
          },
        },
      },
      include: {
        participants: true,
      },
    });
    return newChat;
  },

  existingChat: async (currentUserId: string, otherUserId: string) => {
    const existingChat = await prisma.chat.findFirst({
      where: {
        participants: {
          every: {
            userId: {
              in: [currentUserId, otherUserId],
            },
          },
        },
      },
      include: {
        participants: true,
      },
    });
    return existingChat;
  },
};
