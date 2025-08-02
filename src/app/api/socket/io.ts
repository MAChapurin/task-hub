import type { NextApiRequest } from 'next';

import { Server as IOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { ServerResponse } from 'http';
import { prisma } from '@/shared/lib/db';

type NextApiResponseWithSocket = ServerResponse & {
  socket: {
    server: {
      io?: IOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    console.log('🔧 Socket.IO server initializing...');

    const io = new IOServer(res.socket.server as HTTPServer, {
      path: '/api/socket/io',
    });

    io.on('connection', (socket: Socket) => {
      console.log('🔌 User connected:', socket.id);

      socket.on('join', (chatId: string) => {
        socket.join(chatId);
        console.log(`📥 User joined chat: ${chatId}`);
      });

      socket.on(
        'send-message',
        async (data: { chatId: string; senderId: string; content: string }) => {
          const { chatId, senderId, content } = data;

          const message = await prisma.message.create({
            data: {
              chatId,
              senderId,
              content,
            },
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          await prisma.chat.update({
            where: { id: chatId },
            data: { lastMessageId: message.id },
          });

          io.to(chatId).emit('new-message', message);
        }
      );

      socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
    console.log('✅ Socket.IO server ready');
  }

  res.end();
}
