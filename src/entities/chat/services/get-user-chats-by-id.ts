import { chatRepository } from '../repositories/chat.repository';

export const getUserChatsById = async (userId: string) => {
  const chats = await chatRepository.getUserChats(userId);

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
};
