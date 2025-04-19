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

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useAuth();
  const token = user?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      try {
        const res = await axios.get('https://agrofixcore.onrender.com/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
        setApiStatus(apiStatusConstants.success);
      } catch (err) {
        console.error('Error fetching users:', err);
        setErrorMessage('Failed to fetch users.');
        setApiStatus(apiStatusConstants.failure);
      }
    };

    if (token) fetchUsers();
  }, [token]);

  const openModal = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://agrofixcore.onrender.com/admin/users/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    } finally {
      closeModal();
    }
  };

  const renderLoadingView = () => (
    <div className="text-center py-5">
      <div className="spinner-border text-success" role="status" />
      <p className="text-muted mt-2">Loading users...</p>
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
        <Link to="/admin/users/add" className="btn btn-success">
          Add New User
        </Link>
      </div>
      {users.length === 0 ? (
        <div className="text-center py-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Users"
            style={{ width: '120px', height: '120px', opacity: 0.7 }}
          />
          <h5 className="mt-3 text-secondary">No users found</h5>
          <p className="text-muted">Looks like you haven’t added any users yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ minWidth: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="d-flex flex-wrap gap-2">
                    <Link to={`/admin/users/edit/${user.id}`} className="btn btn-primary btn-sm">
                      Edit Role
                    </Link>
                    <button onClick={() => openModal(user.id)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  const renderSuccessMessage = () => (
    <div className="alert alert-success text-center mt-3">
      ✅ User deleted successfully!
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
        <h2 className="text-success mb-4 text-center">Manage Users</h2>
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
                <p className="mb-0">Are you sure you want to delete this user? This action cannot be undone.</p>
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

export default AdminUsers;
