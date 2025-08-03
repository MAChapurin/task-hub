export interface ChatEntity {
  id: string;
  participants: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  }[];
  lastMessage?: {
    id: string;
    content: string;
    createdAt: string;
  };
}
