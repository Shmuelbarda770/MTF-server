import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import User, { IUser } from '../models/userModel'; // Adjust the path as necessary

// Gmail OAuth2 setup
const oAuth2Client = new google.auth.OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  process.env.YOUR_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.YOUR_REFRESH_TOKEN });

async function sendOTPEmail(userEmail: string, otp: string) {
  // Get access token
  const accessToken = await oAuth2Client.getAccessToken();
  if (!accessToken.token) {
    throw new Error('Failed to obtain access token');
  }

  // Configure transporter with Gmail SMTP details
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // or use port 587 for TLS
    secure: true, // true for 465, false for 587
    auth: {
      type: 'OAuth2',
      user: process.env.YOUR_EMAIL_ADDRESS,
      clientId: process.env.YOUR_CLIENT_ID,
      clientSecret: process.env.YOUR_CLIENT_SECRET,
      refreshToken: process.env.YOUR_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const mailOptions = {
    from: process.env.YOUR_EMAIL_ADDRESS,
    to: userEmail,
    subject: 'Your OTP Code',
    html: `<h1>Your OTP Code</h1><p>Your OTP code is <b>${otp}</b>. It is valid for 60 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${userEmail}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to send email: ${error.message}`);
    }
  }
}

export default sendOTPEmail;
