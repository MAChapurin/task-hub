'use client';

import { useEffect, useRef, useState } from 'react';
import { MessagePayload } from '@/shared/types/socket-events';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SendHorizontal } from 'lucide-react';

interface ChatRoomProps {
  chatId: string;
  currentUserId: string;
}

export default function ChatRoom({ chatId, currentUserId }: ChatRoomProps) {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    fetch(`/api/messages?chatId=${chatId}`)
      .then((res) => res.json())
      .then((data: MessagePayload[]) => setMessages(data))
      .catch(console.error);

    const evtSource = new EventSource(`/api/messages/stream?chatId=${chatId}`);

    evtSource.onmessage = (event) => {
      const message: MessagePayload = JSON.parse(event.data);
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    evtSource.onerror = (err) => {
      console.error('SSE error:', err);
      evtSource.close();
    };

    return () => {
      evtSource.close();
    };
  }, [chatId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId,
        senderId: currentUserId,
        content: input.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to send message');
        setInput('');
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 min-h-0 p-3 border rounded bg-muted text-sm">
        {messages.map((msg) => {
          const isOwn = msg.sender.id === currentUserId;
          return (
            <div
              key={msg.id}
              className={`mb-2 max-w-[70%] ${isOwn ? 'ml-auto text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block px-3 py-2 rounded-lg ${
                  isOwn ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                <div className="font-medium text-xs text-muted-foreground">{msg.sender.name}</div>
                <div>{msg.content}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </ScrollArea>
      <div className="flex">
        <Input
          className="border-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши сообщение..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <Button onClick={sendMessage} disabled={!input.trim()}>
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
