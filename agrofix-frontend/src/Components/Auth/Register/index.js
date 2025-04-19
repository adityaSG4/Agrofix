import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', show: false });
  const navigate = useNavigate();

  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      showAlert('danger', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://agrofixcore.onrender.com/register', formData);
      showAlert('success', 'Registered successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      showAlert('danger', 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="register-container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="register-card p-4 shadow-sm rounded bg-white" style={{ maxWidth: '460px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="text-success mb-1" style={{ fontWeight: '700' }}>🌿 Agrofix</h1>
          <p className="text-muted">Create your account</p>
        </div>

        {alert.show && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, show: false })}></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              required
              disabled={loading}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              disabled={loading}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              disabled={loading}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-3 text-center text-muted">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
