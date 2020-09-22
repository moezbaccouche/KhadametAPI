import * as mongoose from 'mongoose';
export const ConversationMessageSchema = new mongoose.Schema({
  messageId: String,
  conversationId: String,
});
