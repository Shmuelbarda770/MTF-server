import { Schema, model } from 'mongoose';

// Define the User schema
const userSchema = new Schema({
  Id: { type: Number, required: true },
  role: { type: String, required: true, enum: ['Owner'] },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Email: { type: String, required: true },
  AccountName: { type: String, unique: true, required: true },
  CompanyName: { type: String, unique: true, required: true },
  InvoiceName: { type: String, required: true },
});

// Create the User model
const User = model('User', userSchema);

export default User;
