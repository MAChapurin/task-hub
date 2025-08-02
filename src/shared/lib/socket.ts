import { Server } from 'socket.io';

export const io = new Server({
  path: '/api/socket/io',
  addTrailingSlash: false,
  cors: { origin: '*' },
});
