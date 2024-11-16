const express = require('express');
const router = express.Router();
const {
  validateLoginInput,
  validateUserInput,
  loginUser,
  createUser,
  getUserDetails,
  getAllUsers
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for JWT verification

// Get the logged-in user's details
router.get('/', authMiddleware.verifyToken, getAllUsers);
router.get('/me', authMiddleware.verifyToken, getUserDetails);


// User login
router.post('/login', validateLoginInput, loginUser);

// User registration
router.post('/register', validateUserInput, createUser);


module.exports = router;
