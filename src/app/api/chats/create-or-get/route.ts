import { NextRequest, NextResponse } from 'next/server';
import { createNewChat, getExistingChat } from '@/entities/chat/server';

export async function POST(req: NextRequest) {
  try {
    const { currentUserId, otherUserId } = await req.json();

    if (!currentUserId || !otherUserId) {
      return NextResponse.json({ error: 'Missing user IDs' }, { status: 400 });
    }
    if (currentUserId === otherUserId) {
      return NextResponse.json({ error: 'Cannot chat with yourself' }, { status: 400 });
    }

    const existingChat = await getExistingChat(currentUserId, otherUserId);

    if (existingChat) {
      return NextResponse.json(existingChat);
    }

    const newChat = await createNewChat(currentUserId, otherUserId);

    return NextResponse.json(newChat);
  } catch (error) {
    console.error('Error in create-or-get chat:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
