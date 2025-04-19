const db = require('../config/db');

// This function retrieves all products from the database.
exports.getAllProducts = async () => {
  const result = await db.query('SELECT * FROM products');
  return result.rows;
};

// This function retrieves a single product from the database based on the provided ID.
exports.getProductById = async (id) => {
  const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};
