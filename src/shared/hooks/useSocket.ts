import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket-events';
import { useEffect, useState } from 'react';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function useSocket() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      fetch('/api/socket/io');

      socket = io({
        path: '/api/socket/io',
      }) as Socket<ServerToClientEvents, ClientToServerEvents>;

      socket.on('connect', () => setConnected(true));
      socket.on('disconnect', () => setConnected(false));
    }

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, []);

  return {
    socket,
    connected,
  };
}
