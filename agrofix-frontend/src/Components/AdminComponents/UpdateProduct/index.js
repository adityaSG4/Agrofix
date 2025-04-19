import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../Navbar';

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
};

const UpdateProduct = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [status, setStatus] = useState(apiStatus.initial);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://agrofixcore.onrender.com/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { category, name, price, image, description } = res.data.product;
        setFormData({ category, name, price, image, description });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details.');
        setStatus(apiStatus.error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(apiStatus.loading);

    try {
      await axios.put(
        `https://agrofixcore.onrender.com/admin/products/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus(apiStatus.success);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/products');
      }, 2000);
    } catch (err) {
      console.error('Error updating product:', err);
      setStatus(apiStatus.error);
      setError('Failed to update product.');
    }
  };


  const renderSuccessMessage = () => (
    <div className="alert alert-success text-center mt-3">
      ✅ Product updated successfully!
    </div>
  );

  
  const renderErrorMessage = () => (
    <div className="alert alert-danger text-center mt-3">
      ❌ {error}
    </div>
  );


  const renderLoadingView = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
  };


  const renderContent = () => {
    switch (status) {
      case apiStatus.loading:
        return renderLoadingView();
      case apiStatus.error:
        return renderErrorMessage();
      case apiStatus.success:
        return showSuccess && renderSuccessMessage();
      default:
        return (
          <form onSubmit={handleSubmit}>
            {['category', 'name', 'price', 'image'].map((field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  placeholder={`Enter ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={status === apiStatus.loading}
            >
              {status === apiStatus.loading ? 'Updating...' : 'Update Product'}
            </button>
          </form>
        );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="text-center text-success mb-4">Update Product</h3>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
