'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useEventsSource } from '@/shared/lib/sse/client';

import { ChatEvent } from '@/shared/lib/sse/sse-hub';
import { SendMessageForm } from './send-message-form';
import { MessageBubble } from './message-bubble';

export interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

interface ChatBoxProps {
  currentUserId: string;
  otherUserId: string;
  initialMessages: IMessage[];
}

export function ChatBox({ currentUserId, otherUserId, initialMessages }: ChatBoxProps) {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEventsSource<ChatEvent>(`/api/sse/chat?channel=chat:${currentUserId}`, (ev) => {
    if (ev.type === 'new-message') {
      setMessages((prev) => [...prev, ev.payload]);
    }
  });

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.senderId !== currentUserId) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentUserId]);

  return (
    <div className="flex flex-col h-full p-4 border rounded-lg shadow-sm overflow-y-auto">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} isOwn={m.senderId === currentUserId} />
        ))}
        <div ref={bottomRef} />
      </div>
      <SendMessageForm receiverId={otherUserId} />
    </div>
  );
}
