import * as mongoose from 'mongoose';
export const ConversationSchema = new mongoose.Schema({
  conversationCreatorId: String,
  conversationReceiverId: String,
  createdAt: Date,
});
