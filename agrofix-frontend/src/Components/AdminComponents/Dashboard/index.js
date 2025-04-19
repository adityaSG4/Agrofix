import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-success text-center mb-4">Admin Dashboard</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card shadow-sm border-success">
              <div className="card-body">
                <h5 className="card-title text-success">Manage Products</h5>
                <p className="card-text">Add, update, and delete products in the catalog.</p>
                <Link to="/admin/products" className="btn btn-outline-success">Go to Products</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm border-info">
              <div className="card-body">
                <h5 className="card-title text-info">Orders</h5>
                <p className="card-text">View and manage customer orders.</p>
                <Link to="/admin/orders" className="btn btn-outline-info">Go to Orders</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm border-warning">
              <div className="card-body">
                <h5 className="card-title text-warning">Users</h5>
                <p className="card-text">Manage user accounts and roles.</p>
                <Link to="/admin/users" className="btn btn-outline-warning">Go to Users</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
