
import express from 'express';
import {createUser,getAllUsers,checkToken,searchInput,login,checkEmail,getSingleUser,updateUser, exportUsersList} from '../controller/UserController'; 
const router = express.Router();

router.post('/createUser', createUser);

router.get('/users',getAllUsers);

router.post('/users/searchUsers', searchInput);

router.get('/user/:id', getSingleUser);

router.patch('/updateUser/:id', updateUser);

router.post('/login', login);

router.post('/checkEmail', checkEmail);

router.get('/export-users', exportUsersList)

router.post('/auth/google',checkToken )


export default router;