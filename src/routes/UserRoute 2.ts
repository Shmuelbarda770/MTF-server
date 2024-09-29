import express from 'express';
import { createUser } from '../controller/UserController'; 

const router = express.Router();

router.post('/api/users', createUser);



export default router;