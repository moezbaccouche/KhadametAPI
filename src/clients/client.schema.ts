import * as mongoose from 'mongoose';
export const ClientSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  address: String,
  phone: String,
  email: String,
  password: String,
  picture: String,
});
