import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../Navbar';

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  updated: 'UPDATED',
};

const AdminOrderDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const token = user?.token;

  useEffect(() => {
    const fetchOrder = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      try {
        const res = await axios.get(`https://agrofixcore.onrender.com/admin/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
        setStatus(res.data.status);
        setApiStatus(apiStatusConstants.success);
      } catch (err) {
        console.error('Error fetching order:', err);
        setErrorMessage('Failed to load order details.');
        setApiStatus(apiStatusConstants.failure);
      }
    };

    if (token) fetchOrder();
  }, [id, token]);

  const handleStatusUpdate = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      await axios.put(
        `https://agrofixcore.onrender.com/admin/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApiStatus(apiStatusConstants.updated);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error('Error updating status:', err);
      setErrorMessage('Failed to update order status.');
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <div className="text-center py-5">
      <div className="spinner-border text-success" style={{ width: '3rem', height: '3rem' }} />
      <p className="mt-3 text-muted">Loading order details...</p>
    </div>
  );

  const renderFailureView = () => (
    <div className="text-center py-5">
      <h4 className="text-danger">Oops! Something went wrong.</h4>
      <p className="text-muted">{errorMessage}</p>
      <button className="btn btn-outline-secondary mt-3" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="alert alert-success text-center mt-4">
      ✅ Order status updated successfully!
    </div>
  );

  const renderSuccessView = () => (
    <div className="container mt-4">
      <h2 className="text-success mb-4">Order #{order.order_id} Details</h2>
      <div className="card shadow-sm p-4">
        <p><strong>User:</strong> {order.username}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Payment Mode:</strong> {order.payment_mode}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>

        <div className="mb-3 mt-3">
          <label htmlFor="statusSelect" className="form-label">Update Status</label>
          <select
            id="statusSelect"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="btn btn-success mt-2" onClick={handleStatusUpdate}>
            Update Status
          </button>
        </div>

        <h4 className="mt-4">Items</h4>
        <ul className="list-group">
          {order.items.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} (x{item.quantity}) - {item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.success:
      case apiStatusConstants.updated:
        return (
          <>
            {showSuccess && renderSuccessMessage()}
            {order && renderSuccessView()}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      {renderContent()}
    </>
  );
};

export default AdminOrderDetail;
