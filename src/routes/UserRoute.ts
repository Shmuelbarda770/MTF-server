import express from 'express';
import {createUser, getAllUsers, searchInput, getSingleUser} from '../controller/UserController'; 


const router = express.Router();

router.post('/api/users', createUser);

router.get('/users/',getAllUsers);

router.get('/users/searchUsers', searchInput);

router.get('/user/:id', getSingleUser);



export default router;