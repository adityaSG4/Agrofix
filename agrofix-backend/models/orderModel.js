const pool = require('../config/db');

// This function places an order in the database with the provided user ID, address, payment mode, and products.
exports.placeOrder = async (userId, address, paymentMode, products) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      `INSERT INTO orders (user_id, address, payment_mode)
       VALUES ($1, $2, $3) RETURNING id`,
      [userId, address, paymentMode]
    );

    const orderId = result.rows[0].id;

    for (const { product_id, quantity } of products) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [orderId, product_id, quantity]
      );

      await client.query(
        `UPDATE products
         SET quantity = quantity - $1
         WHERE id = $2 AND quantity >= $1`,
        [quantity, product_id]
      );
    }

    await client.query('COMMIT');
    return { orderId };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};




