import { useEffect } from 'react';
import Ably from 'ably';
import { ChatEntity } from '@/entities/chat/domain';

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
    if (chats.length === 0) return;

    const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_KEY! });

    const unsubscribers = chats.map((chat) => {
      const channel = ably.channels.get(`chat:${chat.id}`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listener = (msg: any) => {
        try {
          const message: MessageEventData = msg.data;
          onMessage(chat.id, message);
        } catch (e) {
          console.error('Invalid Ably message', e);
        }
      };

      channel.subscribe('new-message', listener);

      return () => {
        channel.unsubscribe('new-message', listener);
      };
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
      ably.close();
    };
  }, [chats, onMessage]);
}
