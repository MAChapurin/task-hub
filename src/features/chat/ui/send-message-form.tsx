'use client';

import React, { useState, startTransition } from 'react';
import { Input } from '@/shared/ui/input';

interface SendMessageFormProps {
  receiverId: string;
}

export function SendMessageForm({ receiverId }: SendMessageFormProps) {
  const [content, setContent] = useState<string>('');
  // const [, dispatch, isPending] = useActionState<
  //   SendMessageFormState,
  //   SendMessageFormState,
  //   FormData
  // >(sendMessageAction, {} as SendMessageFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const fd = new FormData();
    fd.set('receiverId', receiverId);
    fd.set('content', content);

    startTransition(() => {
      // dispatch(fd);
    });

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Введите сообщение..."
        // disabled={isPending}
      />
      {/* <Button type="submit" disabled={isPending || !content.trim()}>
        Отправить
      </Button> */}
    </form>
  );
}
