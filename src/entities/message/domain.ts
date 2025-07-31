export type GetConversationInput = {
  userId: string;
  otherUserId: string;
};

export type SendMessageInput = {
  senderId: string;
  receiverId: string;
  content: string;
};
