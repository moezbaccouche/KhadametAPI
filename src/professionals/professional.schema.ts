import * as mongoose from 'mongoose';
export const ProfessionalSchema = new mongoose.Schema({
  name: String,
  dob: String,
  address: String,
  city: String,
  phone: String,
  email: String,
  password: String,
  picture: String,
});
