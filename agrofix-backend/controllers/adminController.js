const db = require('../config/db');

/// Get all orders with user and product details
/// This function retrieves all orders from the database, including user and product details.
exports.getAllOrders = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        o.id AS order_id,
        o.address,
        o.payment_mode,
        o.status,
        o.created_at,
        u.username,
        p.name AS product_name,
        p.price AS product_price,
        oi.quantity
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      ORDER BY o.created_at DESC
    `);

    const orders = result.rows.reduce((acc, row) => {
      let order = acc.find(o => o.order_id === row.order_id);
      const productTotal = parseInt(row.product_price.replace(/₹|\D/g, '')) * row.quantity;

      if (!order) {
        order = {
          order_id: row.order_id,
          username: row.username,
          address: row.address,
          payment_mode: row.payment_mode,
          status: row.status,
          created_at: row.created_at,
          items: [],
          total_price: 0
        };
        acc.push(order);
      }

      order.items.push({
        name: row.product_name,
        price: row.product_price,
        quantity: row.quantity,
        total: productTotal
      });
      order.total_price += productTotal;

      return acc;
    }, []);

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

/// Get order by ID
/// This function retrieves a specific order from the database based on the provided ID.
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(`
        SELECT
          o.id AS order_id,
          o.address,
          o.payment_mode,
          o.status,
          o.created_at,
          u.username,
          p.name AS product_name,
          p.price AS product_price,
          oi.quantity
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON p.id = oi.product_id
        WHERE o.id = $1
      `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = result.rows[0];
    const items = result.rows.map(row => ({
      name: row.product_name,
      price: row.product_price,
      quantity: row.quantity
    }));

    res.status(200).json({
      order_id: order.order_id,
      username: order.username,
      address: order.address,
      payment_mode: order.payment_mode,
      status: order.status,
      created_at: order.created_at,
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

/// Update order status
/// This function updates the status of an order in the database.
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
    const result = await db.query(query, [status, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order: result.rows[0] });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};
