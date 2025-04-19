import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../Navbar';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      try {
        const res = await axios.get('https://agrofixcore.onrender.com/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
        setApiStatus(apiStatusConstants.success);
      } catch (err) {
        setErrorMessage('Failed to fetch orders.');
        setApiStatus(apiStatusConstants.failure);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  const renderLoadingView = () => (
    <div className="text-center py-5">
      <div className="spinner-border text-success" role="status" />
      <p className="text-muted mt-2">Loading orders...</p>
    </div>
  );

  const renderFailureView = () => (
    <div className="text-center py-5">
      <h5 className="text-danger">Something went wrong</h5>
      <p className="text-muted">{errorMessage}</p>
      <button className="btn btn-outline-secondary mt-2" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  const renderOrdersView = () => (
    <div>
      {orders.map((order) => (
        <div key={order.order_id} className="card mb-3">
          <div className="card-body">
            <h5>Order #{order.order_id} - {order.username}</h5>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Payment: {order.payment_mode}</p>
            <p>Address: {order.address}</p>
            <p>Total: ₹{order.total_price}</p>
            <Link to={`/admin/orders/${order.order_id}`} className="btn btn-sm btn-outline-success">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.success:
        return renderOrdersView();
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>All Orders</h2>
        {renderContent()}
      </div>
    </>
  );
};

export default AdminOrders;
