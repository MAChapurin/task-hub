import { NextRequest } from 'next/server';
import { sseStream } from '@/shared/lib/sse/server';
import { sseHub } from '@/shared/lib/sse/sse-hub';

export async function GET(req: NextRequest) {
  const channel = req.nextUrl.searchParams.get('channel');
  if (!channel) return new Response('Missing channel', { status: 400 });

  const { response, write, close } = sseStream(req);

  const unsubscribe = sseHub.subscribe(channel, write);

  req.signal.addEventListener('abort', () => {
    unsubscribe();
    close();
  });

  return response;
}
