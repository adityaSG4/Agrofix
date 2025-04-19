const express = require('express');
const router = express.Router();
const adminProductController = require('../controllers/adminProductController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// This route is for admin users to manage products
// It includes routes to get all products, get a product by ID, add a new product, delete a product, and update a product

// Get all products
router.get('/products', verifyToken, isAdmin, adminProductController.getAllProducts);

// Get product by ID
router.get('/products/:id', verifyToken, isAdmin, adminProductController.getProductById);

// Add a new product
router.post('/products', verifyToken, isAdmin, adminProductController.addProduct);

// Delete a product
router.delete('/products/:id', verifyToken, isAdmin, adminProductController.deleteProduct);

// Update a product
router.put('/products/:id', verifyToken, isAdmin, adminProductController.updateProduct);

module.exports = router;