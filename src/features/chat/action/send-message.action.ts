'use server';

import { getCurrentUser } from '@/entities/user/server';
import { sendMessage } from '@/entities/message/services/send-message';
import { sseHub } from '@/shared/lib/sse/sse-hub';

export interface SendMessageFormState {
  errors?: { _form?: string };
}

export const sendMessageAction = async (
  _prev: SendMessageFormState,
  formData: FormData
): Promise<SendMessageFormState> => {
  const user = await getCurrentUser();
  if (!user) return { errors: { _form: 'Неавторизованный пользователь' } };

  const receiverId = formData.get('receiverId')?.toString();
  const content = formData.get('content')?.toString();

  if (!receiverId || !content || !content.trim()) {
    return { errors: { _form: 'Получатель и сообщение обязательны' } };
  }

  const result = await sendMessage({ senderId: user.id, receiverId, content });
  if (result.type === 'left') {
    return { errors: { _form: 'Не удалось отправить сообщение' } };
  }

  const messagePayload = {
    id: result.value.id,
    senderId: user.id,
    receiverId,
    content,
    createdAt: new Date().toISOString(),
  };

  sseHub.broadcast(`chat:${receiverId}`, {
    type: 'new-message',
    payload: messagePayload,
  });

  sseHub.broadcast(`chat:${user.id}`, {
    type: 'new-message',
    payload: messagePayload,
  });

  console.log('Broadcasting to:', `chat:${receiverId}`, `chat:${user.id}`);
  console.log('Message:', messagePayload);

  return {};
};
