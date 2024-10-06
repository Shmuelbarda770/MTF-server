import express from 'express';
import {createUser,getAllUsers,login,searchInput} from '../controller/UserController'; 

const router = express.Router();

router.post('/api/users', createUser);
router.get('/users/',getAllUsers)
router.get('/users/searchUsers', searchInput)
router.post('/login', login)



export default router;