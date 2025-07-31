import { userRepository } from '@/entities/user/repositories/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.trim() === '') {
    return NextResponse.json({ error: 'Query param "q" is required' }, { status: 400 });
  }

  try {
    const users = await userRepository.searchUsers(q);
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
