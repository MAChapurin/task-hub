import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/db';

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('q') || '';

  if (search.trim().length === 0) {
    return NextResponse.json([]);
  }

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
    },
    take: 10,
  });

  return NextResponse.json(users);
}
