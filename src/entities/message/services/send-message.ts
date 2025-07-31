import { SendMessageInput } from '../domain';
import { messageRepository } from '../repositories/message.repository';
import { Either, left, right } from '@/shared/lib/either';

export const sendMessage = async ({
  senderId,
  receiverId,
  content,
}: SendMessageInput): Promise<Either<'invalid-input' | 'unknown-error', { id: string }>> => {
  if (!content.trim()) {
    return left('invalid-input');
  }

  try {
    const message = await messageRepository.send(senderId, receiverId, content);
    return right({ id: message.id });
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    return left('unknown-error');
  }
};
