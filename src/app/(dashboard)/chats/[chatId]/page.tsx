import { getChatCompanion } from '@/entities/chat/services/get-chat-companion';
import { sessionService } from '@/entities/user/server';
import { ChatRoom } from '@/widgets/chat-room';
import { matchEither } from '@/shared/lib/either';

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  const { session } = await sessionService.verifySession();
  const currentUserId = session.id;
  const companionResult = await getChatCompanion(chatId, currentUserId);

  return matchEither(companionResult, {
    left: (error) => {
      if (error === 'chat_not_found') {
        return (
          <div className="h-16 p-4 text-lg font-semibold border-b border-sidebar-border select-none">
            Чат не найден
          </div>
        );
      }

      if (error === 'companion_not_found') {
        return (
          <div className="h-16 p-4 text-lg font-semibold border-b border-sidebar-border select-none">
            Собеседник не найден
          </div>
        );
      }

      return (
        <div className="h-16 p-4 text-lg font-semibold border-b border-sidebar-border select-none">
          Неизвестная ошибка
        </div>
      );
    },
    right: (companion) => (
      <ChatRoom chatId={chatId} currentUserId={currentUserId} companion={companion} />
    ),
  });
}
