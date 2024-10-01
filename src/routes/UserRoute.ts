import express from 'express';
import {createUser, getAllUsers, searchInput, getSingleUser, updateUser} from '../controller/UserController'; 


const router = express.Router();

router.post('/createUser', createUser);

router.get('/users/',getAllUsers);

router.get('/users/searchUsers', searchInput);

router.get('/user/:id', getSingleUser);

router.patch('/updateUser/:id', updateUser);

export default router;