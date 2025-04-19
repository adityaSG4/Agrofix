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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useAuth();
  const token = user?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      try {
        const res = await axios.get('https://agrofixcore.onrender.com/admin/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.products);
        setApiStatus(apiStatusConstants.success);
      } catch (err) {
        console.error('Error fetching products:', err);
        setErrorMessage('Failed to fetch products.');
        setApiStatus(apiStatusConstants.failure);
      }
    };

    if (token) fetchProducts();
  }, [token]);

  const openModal = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://agrofixcore.onrender.com/admin/products/${selectedProductId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    } finally {
      closeModal();
    }
  };

  const renderLoadingView = () => (
    <div className="text-center py-5">
      <div className="spinner-border text-success" role="status" />
      <p className="text-muted mt-2">Loading products...</p>
    </div>
  );

  const renderFailureView = () => (
    <div className="text-center py-5">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="Failure"
        className="mb-3"
        style={{ width: '120px', height: '120px' }}
      />
      <h5 className="text-danger">Something went wrong</h5>
      <p className="text-muted">{errorMessage}</p>
      <button className="btn btn-outline-secondary mt-2" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  const renderSuccessView = () => (
    <>
      <div className="mb-3 text-end">
        <Link to="/admin/products/add" className="btn btn-success">
          Add New Product
        </Link>
      </div>
      {products.length === 0 ? (<div className="text-center py-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Products"
          style={{ width: '120px', height: '120px', opacity: 0.7 }}
        />
        <h5 className="mt-3 text-secondary">No products found</h5>
        <p className="text-muted">Looks like you haven’t added any products yet.</p>
      </div>) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th style={{ minWidth: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.category}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td className="d-flex flex-wrap gap-2">
                    <Link to={`/admin/products/edit/${product.id}`} className="btn btn-primary btn-sm">
                      Edit
                    </Link>
                    <button onClick={() => openModal(product.id)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>)}
    </>
  );

  const renderSuccessMessage = () => (
    <div className="alert alert-success text-center mt-3">
      ✅ Product deleted successfully!
    </div>
  );

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.success:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="text-success mb-4 text-center">Manage Products</h2>
        {showSuccess && renderSuccessMessage()}
        {renderContent()}
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">Are you sure you want to delete this product? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ProductList;
