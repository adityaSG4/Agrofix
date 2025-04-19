import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

import './index.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-success" to="/">
          🌿 Agrofix
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/admin/products')} to="/admin/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/admin/orders')} to="/admin/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/admin/users')} to="/admin/users">Users</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/products')} to="/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/cart')} to="/cart">
                    Cart 🛒 <span className="badge bg-success">{cartItems.length}</span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  id="avatarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="Avatar"
                    className="rounded-circle"
                    width="35"
                    height="35"
                  />
                </span>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="avatarDropdown">
                  <li className="dropdown-item text-muted">Account Type:</li>
                  <li className="dropdown-item text-success">{user?.role}</li>
                  <li><hr className="dropdown-divider" /></li>
                  {!isAdmin ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/profile">My Profile</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-orders">My Orders</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/admin/profile">Admin Profile</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;