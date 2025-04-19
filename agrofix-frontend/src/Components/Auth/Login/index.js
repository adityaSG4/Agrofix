import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './index.css'; 

const Login = () => {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = user?.token;

  useEffect(() => {
    if (token) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [token, user?.role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      alert('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="login-card p-4 shadow-sm rounded bg-white" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="text-success mb-2" style={{ fontWeight: '700' }}>🌿 Agrofix</h1>
          <p className="text-muted">Welcome back! Please login to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
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
          <button className="btn btn-success w-100" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-3 text-center text-muted">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
