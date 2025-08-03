import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/db';
import { redisPub } from '@/shared/lib/redis';

export async function POST(request: Request) {
  try {
    const { chatId, senderId, content } = await request.json();

    if (!chatId || !senderId || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        chatId,
        senderId,
      },
      include: {
        sender: {
          select: { id: true, name: true },
        },
      },
    });

    await prisma.chat.update({
      where: { id: chatId },
      data: { lastMessageId: message.id },
    });

    const channel = `chat:${chatId}:messages`;
    await redisPub.publish(channel, JSON.stringify(message));

    return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
