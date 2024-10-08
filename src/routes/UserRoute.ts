import express from 'express';
import {createUser,getAllUsers,searchInput,login,getSingleUser,updateUser} from '../controller/UserController'; 

const router = express.Router();

router.post('/createUser', createUser);

router.get('/users',getAllUsers);

router.post('/users/searchUsers', searchInput);

router.get('/user/:id', getSingleUser);

router.patch('/updateUser/:id', updateUser);

router.post('/login', login);

export default router;