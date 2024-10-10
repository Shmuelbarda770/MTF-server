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
import { authenticateToken } from '../middleware/authMiddleware'; // Import the auth middleware

const router = express.Router();

// Routes that require authentication
router.post('/createUser', authenticateToken, createUser);
router.get('/users', authenticateToken, getAllUsers);
router.post('/users/searchUsers', authenticateToken, searchInput);
router.get('/user/:id', authenticateToken, getSingleUser);
router.patch('/updateUser/:id', authenticateToken, updateUser);
router.get('/export-users', authenticateToken, exportUsersList);
router.delete('/deleteUser/:email', authenticateToken, deleteUser);

// Public routes
router.post('/check-email', checkEmail); // Open to initiate email check
router.post('/login', login); // Open for login

export default router;