import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing an OTP document in MongoDB.
interface IOTP extends Document {
  userId: mongoose.Types.ObjectId;
  otpCode: string;
  expirationTime: Date;
  status: 'active' | 'used';
  createdAt: Date;
  attempts: number;
}

// Create the schema corresponding to the document interface.
const OTPSchema: Schema = new Schema<IOTP>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the User model
  otpCode: { type: String, required: true },
  expirationTime: { type: Date, required: true },
  status: { type: String, required: true, enum: ['active', 'used'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  attempts: { type: Number, default: 0 },
});

// Set up a pre-save hook to set the expiration time if not provided
OTPSchema.pre<IOTP>('save', function (next) {
  if (!this.expirationTime) {
    const EXPIRATION_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
    this.expirationTime = new Date(Date.now() + EXPIRATION_DURATION);
  }
  next();
});

// Export the OTP model
const OTP = mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;
