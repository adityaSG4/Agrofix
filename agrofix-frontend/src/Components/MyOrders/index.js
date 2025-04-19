import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Navbar';
import OrderItem from '../OrderItem';
import { Link } from 'react-router-dom';
import { FaHashtag } from "react-icons/fa6";
import './index.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = Cookies.get('token');
      const res = await axios.get('https://agrofixcore.onrender.com/my-orders/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) {
      return 0;
    }
    return price.toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-success mb-4">📝 My Orders</h2>
        <div className="order-container">
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {orders.length === 0 ? (
                <div className="alert alert-info text-center my-4">
                  <h4 className="alert-heading">No Orders Found</h4>
                  <p>It seems like you haven't made any purchases yet. No worries!</p>
                  <p>
                    Explore our wide range of fresh products and start shopping now!{' '}
                  </p> <Link to="/products" className="btn btn-success btn-lg">
                    Browse Products
                  </Link>
                </div>

              ) : (
                orders.map((order) => (
                  <div key={order.order_id} className="card order-card shadow-sm mb-4">
                    <div className="card-body">
                      <h5 className="card-title">Order
                        <FaHashtag className="order-icon" />
                        {order.order_id}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Address: {order.address}
                      </h6>
                      <p className="card-text">Payment Mode: {order.payment_mode}</p>
                      <p className="card-text">
                        Placed On: {new Date(order.created_at).toLocaleString()}
                      </p>
                      <p className="card-text">
                        Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                      </p>
                      <h6 className="item-heading">Items:</h6>
                      <ul className="list-group list-group-flush">
                        {order.items.map((item, index) => (
                          <OrderItem key={index} item={item} />
                        ))}
                      </ul>
                      <hr />
                      <div className="order-total">
                        <strong>Total: ₹{formatPrice(order.total_price)}</strong>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
