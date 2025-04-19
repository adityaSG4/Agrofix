import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../Navbar';

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
};

const AddProduct = () => {
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
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(apiStatus.loading);

    try {
      const res = await axios.post(
        'https://agrofixcore.onrender.com/admin/products',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        setStatus(apiStatus.success);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/admin/products');
        }, 2000);
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setStatus(apiStatus.error);
      setError('Failed to add product. Please try again.');
    }
  };

  const renderSuccessMessage = () => (
    <div className="alert alert-success text-center mt-3">
      ✅ Product added successfully!
    </div>
  );

  const renderErrorMessage = () => (
    <div className="alert alert-danger text-center mt-3">
      ❌ {error}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="text-center text-success mb-4">Add New Product</h3>
                <form onSubmit={handleSubmit}>
                  {showSuccess && renderSuccessMessage()}
                  {status === apiStatus.error && renderErrorMessage()}

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
                      placeholder="Brief product description"
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
                    {status === apiStatus.loading ? 'Adding...' : 'Add Product'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
