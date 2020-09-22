import * as mongoose from 'mongoose';
export const MessageSchema = new mongoose.Schema({
  id: String,
  msg: String,
  senderId: String,
  receiverId: String,
  conversationId: String,
  createdAt: Date,
});
