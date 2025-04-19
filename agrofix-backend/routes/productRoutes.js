const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

// This route is for users to manage products
// It includes routes to get all products and get a product by ID

// Get all products
// This route retrieves all products available in the store
router.get('/products',verifyToken, productController.getAllProducts);

// Get product by ID
// This route retrieves a specific product by its ID
router.get('/products/:id',verifyToken, productController.getProductById);

module.exports = router;
