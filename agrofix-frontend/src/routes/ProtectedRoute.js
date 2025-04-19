import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const token = user?.token;

    if (!token || user.role !== 'user' ) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
