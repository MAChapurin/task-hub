import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { currentUserId, otherUserId } = await req.json();

    if (!currentUserId || !otherUserId) {
      return NextResponse.json({ error: 'Missing user IDs' }, { status: 400 });
    }
    if (currentUserId === otherUserId) {
      return NextResponse.json({ error: 'Cannot chat with yourself' }, { status: 400 });
    }

    const existingChat = await prisma.chat.findFirst({
      where: {
        participants: {
          every: {
            userId: {
              in: [currentUserId, otherUserId],
            },
          },
        },
      },
      include: {
        participants: true,
      },
    });

    if (existingChat) {
      return NextResponse.json(existingChat);
    }

    const newChat = await prisma.chat.create({
      data: {
        participants: {
          createMany: {
            data: [{ userId: currentUserId }, { userId: otherUserId }],
          },
        },
      },
      include: {
        participants: true,
      },
    });

    return NextResponse.json(newChat);
  } catch (error) {
    console.error('Error in create-or-get chat:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
