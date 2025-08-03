import { ChatEntity } from '@/entities/chat/domain';
import { useEffect } from 'react';

type MessageEventData = {
  id: string;
  chatId: string;
  content: string;
  createdAt: string;
  senderId: string;
};

export function useChatSidebarSubscription(
  chats: ChatEntity[],
  onMessage: (chatId: string, message: MessageEventData) => void
) {
  useEffect(() => {
    const controllers = chats.map((chat) => {
      const eventSource = new EventSource(`/api/messages/stream?chatId=${chat.id}`);

      eventSource.onmessage = (event) => {
        try {
          const message: MessageEventData = JSON.parse(event.data);
          onMessage(chat.id, message);
        } catch (e) {
          console.error('Invalid SSE message', e);
        }
      };

      return () => eventSource.close();
    });

    return () => {
      controllers.forEach((stop) => stop());
    };
  }, [chats, onMessage]);
}
