const Product = require('../models/productModel');

// This function retrieves all products from the database and sends them as a JSON response.
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// This function retrieves a single product by its ID from the database and sends it as a JSON response.
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
