export interface Message {
  id: string;
  msg: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  createdAt: Date;
}
