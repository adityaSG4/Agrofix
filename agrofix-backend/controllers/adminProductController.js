const pool = require('../config/db');

// GET all products
// This function retrieves all products from the database and returns them in descending order by ID.
exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json({ products: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};

// GET a product by ID
// This function retrieves a single product from the database based on the provided ID.
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
};

// ADD a new product
// This function adds a new product to the database with the provided details.
exports.addProduct = async (req, res) => {
  const { category, name, price, image, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (category, name, price, image, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [category, name, price, image, description]
    );
    res.status(201).json({ message: 'Product added', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err });
  }
};

// DELETE a product
// This function deletes a product from the database based on the provided ID.
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
};

// UPDATE a product
// This function updates the details of a product in the database based on the provided ID.
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category, name, price, image, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET category = $1, name = $2, price = $3, image = $4, description = $5 WHERE id = $6 RETURNING *',
      [category, name, price, image, description, id]
    );
    res.json({ message: 'Product updated', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
};