import mongoose,{ Schema, model } from 'mongoose';

// Role schema can be separated if you plan to expand it in the future.
const userSchema = new Schema({
  id: { type: Number},
  role: { type: String, enum: ['Viewer', 'Admin', 'Editor'] },
  firstName: { type: String},
  lastName: { type: String },
  phoneNumber: { type: String },
  email: { type: String},
  accountName: { type: String, unique: true },
  companyName: { type: String, unique: true},
  invoiceName: { type: String}, // Ensure this is necessary
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