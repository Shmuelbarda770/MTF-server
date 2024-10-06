import express from 'express'; 
import UserRoute from './UserRoute'

const router = express.Router();

router.use('/api/users', UserRoute);

export default router;