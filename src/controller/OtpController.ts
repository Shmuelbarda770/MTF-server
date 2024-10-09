import { Request, Response } from 'express';
import OTP, { insertOTP } from '../models/otpModel'; // Adjust the path as necessary
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Gmail OAuth2 setup
const oAuth2Client = new google.auth.OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  process.env.YOUR_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.YOUR_REFRESH_TOKEN });

// Function to send OTP email
async function sendOTPEmail(userEmail: string, otp: string) {
  const accessToken = await oAuth2Client.getAccessToken();
  if (!accessToken.token) {
    throw new Error('Failed to obtain access token');
  }
  
  const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.YOUR_EMAIL_ADDRESS,
      clientId: process.env.YOUR_CLIENT_ID,
      clientSecret: process.env.YOUR_CLIENT_SECRET,
      refreshToken: process.env.YOUR_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
  console.log(1);

  const mailOptions = {
    from: process.env.YOUR_EMAIL_ADDRESS,
    to: userEmail,
    subject: 'Your OTP Code',
    html: `<h1>Your OTP Code</h1><p>Your OTP code is <b>${otp}</b>. It is valid for 60 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

// API route to handle OTP generation and email
export const sendOTPToEmail: any = async (req: Request, res: Response) => {
  console.log('1');
  
  const { email } = req.body;
  console.log('2');
  
  // Ensure email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  console.log('3');

  try {
    // Generate and store OTP in the database
    const newOTP = await insertOTP(email);
    console.log('4');
    // Send OTP to the user's email
    await sendOTPEmail(email, newOTP.otpCode);
    console.log('gg');
    res.status(200).json({ message: 'OTP sent successfully', otpId: newOTP._id });
    console.log('GG');
  } catch (error) {
    console.log('Lol');
    res.status(500).json({ message: 'Error sending OTP', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};


