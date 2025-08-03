import { chatRepository } from '../repositories/chat.repository';

export const getExistingChat = async (currentUserId: string, otherUserId: string) => {
  const existingChat = await chatRepository.existingChat(currentUserId, otherUserId);
  return existingChat;
};
