import { messageRepository } from '../repositories/message.repository';
import { Message } from '@prisma/client';
import { Either, right, left } from '@/shared/lib/either';
import { GetConversationInput } from '../domain';

export const getConversation = async ({
  userId,
  otherUserId,
}: GetConversationInput): Promise<Either<'unknown-error', Message[]>> => {
  try {
    const messages = await messageRepository.getConversation(userId, otherUserId);
    return right(messages);
  } catch (error) {
    console.error('Ошибка при получении сообщений:', error);
    return left('unknown-error');
  }
};
