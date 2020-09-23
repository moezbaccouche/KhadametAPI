import * as mongoose from 'mongoose';
export const NotificationSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  type: Number,
  createdAt: Date,
  skillId: String,
});
