import { NextResponse } from 'next/server';
import { redisSub } from '@/shared/lib/redis';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get('chatId');
  if (!chatId) return NextResponse.json({ error: 'chatId required' }, { status: 400 });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const channel = `chat:${chatId}:messages`;

      const onMessage = (channelName: string, message: string) => {
        if (channelName === channel) {
          controller.enqueue(encoder.encode(`data: ${message}\n\n`));
        }
      };

      await redisSub.subscribe(channel);
      redisSub.on('message', onMessage);

      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(':\n\n'));
      }, 15000);

      const close = () => {
        clearInterval(heartbeat);
        redisSub.off('message', onMessage);
        redisSub.unsubscribe(channel);
        controller.close();
      };

      request.signal.addEventListener('abort', close);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
