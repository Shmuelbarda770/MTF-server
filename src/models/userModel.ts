import { Schema, model } from 'mongoose';

// Role schema can be separated if you plan to expand it in the future.
const userSchema = new Schema({
  Id: { type: Number, required: true }, // Consider using MongoDB's ObjectId
  Role: { type: String, required: true, enum: ['Owner'] }, // Can expand role types later
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Email: { type: String, required: true },
  AccountName: { type: String, unique: true, required: true },
  CompanyName: { type: String, unique: true, required: true },
  InvoiceName: { type: String, required: true }, // Ensure this is necessary
});

const User = model('User', userSchema);

export default User;



// Define the User schema 
// The user have: id (ת"ז), Role (תפקיד),
// FirstName (שם פרטי), LastName(שם משפחה),
// PhoneNumber (מספר טלפון), Email (אימייל),
// AccountName (שם חשבון),CompanyName (שם חברה),
// need to create a Role schema  separately?
// need to add anther attribute?
// need to change a type for one of the 