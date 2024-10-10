import express from 'express';
import { 
  createUser, 
  getAllUsers, 
  searchInput, 
  login, 
  getSingleUser, 
  updateUser, 
  deleteUser, 
  checkEmail, 
  exportUsersList 
} from '../controller/UserController';

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

export default router;