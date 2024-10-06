import mongoose, { Schema, model } from 'mongoose';

export interface IUser extends Document {
  role: String, 
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
}

// Role schema can be separated if you plan to expand it in the future.
const userSchema = new Schema({
  role: { type: String, enum: ['Viewer', 'Admin', 'Editor'] },
  firstName: { type: String},
  lastName: { type: String },
  phoneNumber: { type: String },
  email: { type: String},
});

// Create the User model
const User = model<IUser>('User', userSchema);

export default User;