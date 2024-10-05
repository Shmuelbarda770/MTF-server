import mongoose,{ Schema, model } from 'mongoose';

// Role schema can be separated if you plan to expand it in the future.
const userSchema = new Schema({
  role: { type: String, enum: ['Viewer', 'Admin', 'Editor'] },
  firstName: { type: String},
  lastName: { type: String },
  phoneNumber: { type: String },
  email: { type: String},
});

const User = model('User', userSchema);

export default User;