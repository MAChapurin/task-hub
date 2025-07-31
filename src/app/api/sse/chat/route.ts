import { NextRequest } from 'next/server';
import { sseStream } from '@/shared/lib/sse/server';
import { sseHub } from '@/shared/lib/sse/sse-hub';

export async function GET(req: NextRequest) {
  const channel = req.nextUrl.searchParams.get('channel');
  if (!channel) return new Response('Missing channel', { status: 400 });

  const { response, write, close } = sseStream(req);

  write({ type: 'connected', timestamp: Date.now() });

  const unsubscribe = sseHub.subscribe(channel, write);

  const keepAliveId = setInterval(() => {
    write({ type: 'keep-alive', timestamp: Date.now() });
  }, 20000);

  req.signal.addEventListener('abort', () => {
    console.log('SSE client disconnected');
    clearInterval(keepAliveId);
    unsubscribe();
    close();
  });

  return response;
}
