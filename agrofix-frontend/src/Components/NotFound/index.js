import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NotFound = () => {
  const { user } = useAuth();
  const role = user?.role;

  const homeRoute = role === 'admin' ? '/admin/dashboard' : '/';

  return (
    <div className="container text-center mt-5 pt-5">
      <div className="mt-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="Not found"
          style={{ maxWidth: '200px', opacity: 0.7 }}
        />
      </div>
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="lead text-muted mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to={homeRoute} className="btn btn-outline-success btn-lg px-4">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
