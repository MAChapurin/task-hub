'use client';

import { cn } from '@/shared/lib/css';
import { format } from 'date-fns';
import { IMessage } from './chat-box';

type MessageBubbleProps = {
  message: IMessage;
  isOwn: boolean;
};

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex flex-col max-w-[70%] rounded-lg p-3 mb-2',
        isOwn ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-black'
      )}
    >
      <p className="text-sm whitespace-pre-line">{message.content}</p>
      <span className="text-xs text-gray-500 mt-1 self-end">
        {format(new Date(message.createdAt), 'HH:mm')}
      </span>
    </div>
  );
}
