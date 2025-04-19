import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import Home from './Components/Home';
import Products from './Components/Products';
import ProductDetail from './Components/ProductDetail';
import Cart from './Components/Cart';
import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './Components/Profile';
import MyOrders from './Components/MyOrders';
import PlaceOrder from './Components/PlaceOrder';

import AdminRoute from './routes/AdminRoute';
import Dashboard from './Components/AdminComponents/Dashboard';
import ProductList from './Components/AdminComponents/ProductList';
import AddProduct from './Components/AdminComponents/AddProduct';
import UpdateProduct from './Components/AdminComponents/UpdateProduct';
import AdminOrders from './Components/AdminComponents/AdminOrders';
import AdminOrderDetail from './Components/AdminComponents/AdminOrderDetail';
import AdminProfile from './Components/AdminComponents/AdminProfile';
import AdminUsers from './Components/AdminComponents/AdminUsers';
import EditUserRole from './Components/AdminComponents/EditUserRole';

import NotFound from './Components/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        
        {/* Public Routes */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <AdminRoute>
              <AdminOrderDetail />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/edit/:id"
          element={
            <AdminRoute>
              <EditUserRole />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />


        {/* user routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/place-order"
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
