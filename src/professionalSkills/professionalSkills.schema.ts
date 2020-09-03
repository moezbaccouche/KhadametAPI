import * as mongoose from 'mongoose';
export const ProfessionalSkillSchema = new mongoose.Schema({
  professionalId: String,
  skillId: String,
  salary: String,
});
