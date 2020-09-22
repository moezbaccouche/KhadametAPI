export interface Conversation {
  id?: string;
  conversationCreatorId: string;
  conversationReceiverId: string;
  createdAt: Date;
}
