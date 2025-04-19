const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin, verifyToken } = require('../middleware/authMiddleware');

// This route is for admin users to manage orders
// It includes routes to get all orders, get an order by ID, and update the status of an order

// Get all orders
router.get('/orders', verifyToken, isAdmin, adminController.getAllOrders);

// Get order by ID
router.get('/orders/:id', verifyToken, isAdmin, adminController.getOrderById);

// Update order status (pending, shipped, delivered, cancelled)
router.put('/orders/:id', verifyToken, isAdmin, adminController.updateOrderStatus);

module.exports = router;
