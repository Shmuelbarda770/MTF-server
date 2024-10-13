
import express from 'express';
import {createUser,getAllUsers,searchInput,login,checkEmail,getSingleUser,updateUser, exportUsersList,deleteUser,checkToken} from '../controller/UserController'; 

const router = express.Router();

// Routes without authentication
router.post('/createUser', createUser);
router.get('/users', getAllUsers);
router.post('/users/searchUsers', searchInput);
router.get('/user/:id', getSingleUser);
router.patch('/updateUser/:id', updateUser);
router.get('/export-users', exportUsersList);
router.delete('/deleteUser/:email', deleteUser);

// Public routes
router.post('/check-email', checkEmail); // Open to initiate email check
router.post('/login', login); // Open for login

router.post('/auth/google',checkToken )


export default router;