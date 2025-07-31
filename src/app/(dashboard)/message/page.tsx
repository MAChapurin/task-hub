import { ChatBox } from '@/features/chat/ui/chat-box';
import { getCurrentUser } from '@/entities/user/server';
import { getUser } from '@/entities/user/repositories/user';
import { matchEither } from '@/shared/lib/either';
import { redirect, notFound } from 'next/navigation';
import { getConversation } from '@/entities/message/services/get-conversation';

import { PATHNAMES } from '@/shared/constants/pathnames';

export default async function MessagePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(PATHNAMES.LOGIN);
  }

  const rawOtherUserId = (await searchParams).with;
  const otherUserId = Array.isArray(rawOtherUserId) ? rawOtherUserId[0] : rawOtherUserId;

  if (!otherUserId || otherUserId === currentUser.id) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Выберите пользователя для начала общения.</p>
      </div>
    );
  }

  const otherUser = await getUser({ id: otherUserId });

  if (!otherUser) {
    notFound();
  }

  const conversationResult = await getConversation({
    userId: currentUser.id,
    otherUserId,
  });

  return matchEither(conversationResult, {
    left: (error) => <div className="p-4 text-red-500">Ошибка при загрузке сообщений: {error}</div>,
    right: (messages) => (
      <div className="p-4 h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Чат с {otherUser.name}</h1>
        <ChatBox
          currentUserId={currentUser.id}
          otherUserId={otherUserId}
          initialMessages={messages.map((m) => ({
            ...m,
            createdAt: m.createdAt.toISOString(),
          }))}
        />
      </div>
    ),
  });
}
