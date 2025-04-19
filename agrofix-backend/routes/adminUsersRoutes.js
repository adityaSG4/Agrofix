const express = require('express');
const adminUserController = require('../controllers/adminUserController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// This route is for admin users to manage users
// It includes routes to get all users, get a user by ID, update a user role, and delete a user

// Get all users
router.get('/users',verifyToken, isAdmin, adminUserController.getAllUsers);

// Get user by ID
router.get('/users/:id', verifyToken, isAdmin,  adminUserController.getUserById);

// Update user role (admin/user)
router.put('/users/:id',verifyToken, isAdmin,  adminUserController.updateUserRole);

// Delete user
router.delete('/users/:id',verifyToken, isAdmin, adminUserController.deleteUser);

module.exports = router;
