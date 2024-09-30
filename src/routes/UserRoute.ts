import express from 'express';
import { createUser , getSingleUser } from '../controller/UserController'; 

const router = express.Router();

router.post('/api/users', createUser);
router.get('/user/:id', getSingleUser)


export default router;