export interface ServerToClientEvents {
  'new-message': (message: MessagePayload) => void;
}

export interface ClientToServerEvents {
  join: (chatId: string) => void;
  'send-message': (payload: { chatId: string; senderId: string; content: string }) => void;
}

export interface MessagePayload {
  id: string;
  content: string;
  createdAt: string;
  chatId: string;
  sender: {
    id: string;
    name: string;
  };
}
