import { Request, Response } from 'express';
import OTP, { insertOTP } from '../models/otpModel';
import nodemailer from 'nodemailer';
import axios from 'axios';


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
      user: 'stopetaco@gmail.com', 
      clientId: process.env.YOUR_CLIENT_ID,
      clientSecret: process.env.YOUR_CLIENT_SECRET,
      refreshToken: process.env.YOUR_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: 'stopetaco@gmail.com', 
    to: userEmail,
    subject: 'Your OTP Code',
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      max-width: 100px;
    }
    .content {
      font-size: 16px;
      color: #333;
      text-align: center;
    }
    .otp-code {
      font-size: 24px;
      color: #333;
      font-weight: bold;
      letter-spacing: 5px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://raw.githubusercontent.com/IMPinto/UIPR/refs/heads/main/Screenshot%202024-10-10%20124826.png" alt="MTF Smart Security Logo">
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your OTP code is:</p>
      <div class="otp-code">${otp}</div>
      <p>This code is valid for the next 60 minutes. Please do not share this code with anyone.</p>
    </div>
    <div class="footer">
      <p>If you didn't request this, please ignore this email.</p>
      <p>&copy; 2024 MTF Smart security</p>
    </div>
  </div>
</body>
</html>
`,
  };

  await transporter.sendMail(mailOptions);
}

// API route to handle OTP generation and email
export const sendOTPToEmail: any = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const newOTP = await insertOTP(email);
    await sendOTPEmail(email, newOTP.otpCode);
    res.status(200).json({ message: 'OTP sent successfully', otpId: newOTP._id });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};