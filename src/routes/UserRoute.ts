import express from 'express';
import {createUser,getAllUsers,searchInput, deleteUser} from '../controller/UserController'; 

const router = express.Router();

router.post('/api/users', createUser);
router.get('/users/',getAllUsers)
router.get('/users/searchUsers', searchInput)
router.delete('/deleteUser', deleteUser)

export default router;