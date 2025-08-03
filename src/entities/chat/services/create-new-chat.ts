import { chatRepository } from '../repositories/chat.repository';

export const createNewChat = async (currentUserId: string, otherUserId: string) => {
  const newChat = await chatRepository.createChat(currentUserId, otherUserId);
  return newChat;
};
