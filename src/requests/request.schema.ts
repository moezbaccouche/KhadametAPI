import * as mongoose from 'mongoose';
export const RequestSchema = new mongoose.Schema({
  category: String,
  date: Date,
  time: Date,
  address: String,
  description: String,
  status: Number,
  creationTime: Date,
});
