const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

// This route is for users to manage their orders
// It includes routes to place a new order, and get orders by user ID

// Place a new order
// This route allows a user to place a new order. It requires the user to be authenticated.
router.post('/orders', verifyToken, orderController.placeOrder);

// Get orders by user ID
// This route retrieves all orders placed by a specific user
router.get('/my-orders/user', verifyToken, orderController.getOrdersByUserId);

module.exports = router;
