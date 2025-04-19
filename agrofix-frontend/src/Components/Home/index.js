import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const Home = () => {
  return (
    <>
      <Navbar /> 
      <div className="home-container bg-light py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold text-success">Welcome to Agrofix 🌿</h1>
          <p className="lead text-muted mt-3">
            Your one-stop platform for fresh farm produce, bulk orders, and easy tracking.
          </p>
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/products" className="btn btn-success btn-lg px-4">
              View Products
            </Link>
            <Link to="/my-orders" className="btn btn-outline-success btn-lg px-4">
              Place Order
            </Link>
          </div>
        </div>
      </div>
    </>

  );
};

export default Home;
