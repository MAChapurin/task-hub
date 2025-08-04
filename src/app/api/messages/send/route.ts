import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/db';
import Ably from 'ably';

const ably = new Ably.Realtime(process.env.ABLY_API_KEY!);

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

    const channel = ably.channels.get(`chat:${chatId}`);
    await channel.publish('new-message', message);

    return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
