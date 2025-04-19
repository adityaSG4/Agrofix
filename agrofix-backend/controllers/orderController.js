const Order = require('../models/orderModel');
const db = require('../config/db'); 

// Place an order
// This function handles the order placement process. It retrieves the user ID from the token, extracts the order details from the request body, and calls the Order model to place the order in the database.
exports.placeOrder = async (req, res) => {
  const userId = req.user.id; // Retrieved from token
  const { address, paymentMode, products } = req.body;

  try {
    const { orderId } = await Order.placeOrder(userId, address, paymentMode, products);
    res.status(201).json({ message: 'Order placed successfully!', orderId });
  } catch (err) {
    console.error('OrderController error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// Helper function to extract numeric value from price string and convert to float
const extractPrice = (priceStr) => {
  const priceMatch = priceStr.match(/₹([\d.]+)/);
  return priceMatch ? parseFloat(priceMatch[1]) : 0;
};

// Get orders by user ID
// This function retrieves all orders placed by a specific user. It joins the orders, order_items, products, and users tables to get the necessary details.
exports.getOrdersByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
      SELECT
        orders.id AS order_id,
        orders.address,
        orders.payment_mode,
        orders.status,
        orders.created_at,
        users.username AS user_name,
        order_items.product_id,
        order_items.quantity,
        products.name AS product_name,
        products.price AS product_price
      FROM
        orders
      JOIN order_items ON order_items.order_id = orders.id
      JOIN products ON products.id = order_items.product_id
      JOIN users ON users.id = orders.user_id
      WHERE
        orders.user_id = $1;  -- user_id dynamically passed
    `;
    
    const result = await db.query(query, [userId]);

    const orders = result.rows.reduce((acc, row) => {
      let order = acc.find(order => order.order_id === row.order_id);

      if (!order) {
        order = {
          order_id: row.order_id,
          address: row.address,
          payment_mode: row.payment_mode,
          status: row.status,
          created_at: row.created_at,
          user_name: row.user_name,
          items: [],
          total_price: 0  
        };
        acc.push(order);
      }

      const productPrice = extractPrice(row.product_price);  
      const productTotalPrice = productPrice * row.quantity;

      order.items.push({
        product_id: row.product_id,
        product_name: row.product_name,
        product_price: row.product_price,
        quantity: row.quantity,
        total_price: productTotalPrice 
      });

      order.total_price += productTotalPrice;

      return acc;
    }, []); 

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};





