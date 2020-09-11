import * as mongoose from 'mongoose';
export const SkillRatingSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  skillId: String,
  clientId: String,
  professionalId: String,
  postedAt: Date,
});
