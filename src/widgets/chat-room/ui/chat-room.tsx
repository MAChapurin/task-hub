'use client';

import { useEffect, useRef, useState } from 'react';
import { MessagePayload } from '@/shared/types/socket-events';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SendHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface ChatRoomProps {
  chatId: string;
  currentUserId: string;
  companion: {
    id: string;
    name: string;
    avatarUrl: string | null;
  } | null;
}

export function ChatRoom({ chatId, currentUserId, companion }: ChatRoomProps) {
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
      <div className="h-16 p-4 text-lg font-semibold border-b border-sidebar-border select-none">
        {companion && (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={companion.avatarUrl || undefined} />
              <AvatarFallback>{companion?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-sm">{companion.name}</span>
            </div>
          </div>
        )}
      </div>
      <ScrollArea className="flex-1 min-h-0 p-4 border rounded bg-background text-sm">
        <div className="flex flex-col gap-2">
          {messages.map((msg) => {
            const isOwn = msg.sender.id === currentUserId;
            return (
              <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl relative break-words border ${
                    isOwn
                      ? 'bg-[--primary] text-[--primary-foreground] border-[--primary] rounded-br-none'
                      : 'bg-[--secondary] text-[--secondary-foreground] border-[--border] rounded-bl-none'
                  }`}
                >
                  {!isOwn && (
                    <div className="text-xs font-medium text-[--muted-foreground] mb-1">
                      {msg.sender.name}
                    </div>
                  )}
                  <div>{msg.content}</div>
                  <div className="text-xs text-[--muted-foreground] mt-1 text-right">
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
        </div>
      </ScrollArea>

      <div className="flex gap-2 mt-2">
        <Input
          className="border border-input bg-background"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши сообщение..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <Button onClick={sendMessage} disabled={!input.trim()} className="shrink-0">
          <SendHorizontal size={18} />
        </Button>
      </div>
    </div>
  );
}
