import * as mongoose from 'mongoose';
export const RequestSchema = new mongoose.Schema({
  skillId: String,
  clientId: String,
  professionalId: String,
  date: Date,
  address: String,
  description: String,
  status: Number,
  createdAt: Date,
});
