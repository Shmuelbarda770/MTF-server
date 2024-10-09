import { Request, Response } from 'express';
import OTP, { insertOTP } from '../models/otpModel'; // Adjust the path as necessary
import nodemailer from 'nodemailer';
import axios from 'axios';

// Replace these with your OAuth2 credentials

// Function to get an access token
async function getAccessToken() {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: process.env.YOUR_CLIENT_ID,
        client_secret: process.env.YOUR_CLIENT_SECRET,
        refresh_token: process.env.YOUR_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      },
    });
    return response.data.access_token;
  } catch (error: any) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Failed to obtain access token');
  }
}

// Function to send OTP email
async function sendOTPEmail(userEmail: string, otp: string) {
  const accessToken = await getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'stopetaco@gmail.com', // Replace with your email
      clientId: process.env.YOUR_CLIENT_ID,
      clientSecret: process.env.YOUR_CLIENT_SECRET,
      refreshToken: process.env.YOUR_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: 'stopetaco@gmail.com', // Replace with your email
    to: userEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 60 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

// API route to handle OTP generation and email
export const sendOTPToEmail: any = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Ensure email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Generate and store OTP in the database
    const newOTP = await insertOTP(email);
    // Send OTP to the user's email
    await sendOTPEmail(email, newOTP.otpCode);
    res.status(200).json({ message: 'OTP sent successfully', otpId: newOTP._id });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};