import express from 'express';
import {createUser, getAllUsers, searchInput, getSingleUser, updateUser, deleteUser} from '../controller/UserController'; 


const router = express.Router();

router.post('/createUsers', createUser);

router.get('/users/',getAllUsers);

router.get('/users/searchUsers', searchInput);

router.get('/user/:id', getSingleUser);

router.patch('/updateUser/:id', updateUser);

router.delete('/deleteUser', deleteUser);

export default router;