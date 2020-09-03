import * as mongoose from 'mongoose';
export const ReviewSchema = new mongoose.Schema({
  generalRating: Number,
  comment: String,
  postedAt: Date,
  clientId: String,
  professionalId: String,
});
