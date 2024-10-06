import { Schema, model } from 'mongoose';

export interface IUser extends Document {
  Id: Number,
  role: String, 
  FirstName: String,
  LastName: String,
  PhoneNumber: String,
  Email: String,
  AccountName: String,
  CompanyName: String,
  InvoiceName: String,

}


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
const User = model<IUser>('User', userSchema);

export default User;
