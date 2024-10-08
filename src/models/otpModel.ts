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

// Set up a pre-save hook to set the expiration time and ensure uniqueness of the OTP
OTPSchema.pre<IOTP>('save', async function (next) {
  const otp = this;
  const EXPIRATION_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

  // Set the expiration time to 60 minutes if not provided
  if (!otp.expirationTime) {
    otp.expirationTime = new Date(Date.now() + EXPIRATION_DURATION);
  }

  try {
    // Check if an OTP with the same userId and active status already exists
    const existingOTP = await OTP.findOne({
      userId: otp.userId,
      expirationTime: { $gt: new Date() }, // Ensure it's not expired
      status: 'active',
    });

    if (existingOTP) {
      // If OTP already exists for this user and is active, regenerate a new one
      otp.otpCode = generateUniqueOTP();
    }
    
    next(); // Proceed to save the new OTP
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

// Function to generate a unique OTP
const generateUniqueOTP = (length: number = 6): string => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString(); // Generates a digit between 0-9
  }
  return otp;
};

// Export the OTP model
const OTP = mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;
