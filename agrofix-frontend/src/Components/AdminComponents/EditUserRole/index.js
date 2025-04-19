import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../Navbar';

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
};

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.token;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });

  const [status, setStatus] = useState(apiStatus.initial);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://agrofixcore.onrender.com/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { username, email, role } = res.data.user;
        setFormData({ username, email, role });
        setStatus(apiStatus.success);
      } catch (err) {
        setError('Failed to fetch user data.');
        setStatus(apiStatus.error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUser();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus(apiStatus.loading);

    try {
      await axios.put(
        `https://agrofixcore.onrender.com/admin/users/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatus(apiStatus.success);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/users');
      }, 2000);
    } catch (err) {
      console.error('Error updating user:', err);
      setStatus(apiStatus.error);
      setError('Failed to update user.');
    }
  };

  const renderSuccessMessage = () => (
    <div className="alert alert-success text-center mt-3">
      ✅ User updated successfully!
    </div>
  );

  const renderErrorMessage = () => (
    <div className="alert alert-danger text-center mt-3">
      ❌ {error}
    </div>
  );

  const renderLoadingView = () => (
    <div className="text-center py-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleUpdate}>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          value={formData.username}
          onChange={handleChange}
          readOnly 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="text"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          readOnly 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <select
          name="role"
          className="form-select"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={status === apiStatus.loading}
      >
        {status === apiStatus.loading ? 'Updating...' : 'Update User'}
      </button>
    </form>
  );

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="text-center text-success mb-4">Edit User</h3>
                {loading ? renderLoadingView() : (
                  <>
                    {showSuccess && renderSuccessMessage()}
                    {status === apiStatus.error && renderErrorMessage()}
                    {renderForm()}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
