import { sessionService } from '@/entities/user/server';
import { ChatRoom } from '@/widgets/chat-room';

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  const { session } = await sessionService.verifySession();
  const currentUserId = session.id;

  return <ChatRoom chatId={chatId} currentUserId={currentUserId} />;
}
