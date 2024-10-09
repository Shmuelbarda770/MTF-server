import express from 'express';
import { sendOTPToEmail } from '../controller/OtpController';

const router = express.Router();

router.post('/sendotpbyemail', sendOTPToEmail)

export default router;