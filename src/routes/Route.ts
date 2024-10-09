import express from 'express';
import OtpRoute from './OtpRoute'
import UserRoute from './UserRoute'

const router = express.Router();

router.use('/api/users', UserRoute);

router.use('/api/otp', OtpRoute)

export default router;