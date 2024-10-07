import express from 'express';
import {createUser,getAllUsers,searchInput,login,getSingleUser,updateUser, exportUsersList} from '../controller/UserController'; 

const router = express.Router();

router.post('/createUser', createUser);

router.get('/users',getAllUsers);

router.get('/users/searchUsers', searchInput);

router.get('/user/:id', getSingleUser);

router.patch('/updateUser/:id', updateUser);

router.post('/login', login);

router.get('/export-users', exportUsersList)

export default router;