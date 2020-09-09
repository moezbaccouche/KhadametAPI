import * as mongoose from 'mongoose';
export const SkillRatingSchema = new mongoose.Schema({
  rating: Number,
  skillId: String,
  clientId: String,
  professionalId: String,
});
