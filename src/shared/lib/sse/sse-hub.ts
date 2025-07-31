export type ChatEvent = {
  type: 'new-message';
  payload: {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
  };
};

type Listener<T> = (data: T) => void;

class SSEHub {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners = new Map<string, Set<Listener<any>>>();

  subscribe<T>(channel: string, cb: Listener<T>): () => void {
    if (!this.listeners.has(channel)) this.listeners.set(channel, new Set());
    this.listeners.get(channel)!.add(cb);
    return () => {
      this.listeners.get(channel)?.delete(cb);
      if (this.listeners.get(channel)?.size === 0) this.listeners.delete(channel);
    };
  }

  broadcast<T>(channel: string, data: T): void {
    this.listeners.get(channel)?.forEach((cb) => cb(data));
  }
}

export const sseHub = new SSEHub();
