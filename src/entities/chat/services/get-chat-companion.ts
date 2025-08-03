import { chatRepository } from '../repositories/chat.repository';
import { Either, left, right } from '@/shared/lib/either';

type ErrorReason = 'chat_not_found' | 'companion_not_found';

export async function getChatCompanion(
  chatId: string,
  currentUserId: string
): Promise<Either<ErrorReason, { id: string; name: string; avatarUrl: string | null }>> {
  const chat = await chatRepository.getChatById(chatId);

  if (!chat) {
    return left('chat_not_found');
  }

  const companion = chat.participants.map((p) => p.user).find((u) => u.id !== currentUserId);

  if (!companion) {
    return left('companion_not_found');
  }

  return right(companion);
}
