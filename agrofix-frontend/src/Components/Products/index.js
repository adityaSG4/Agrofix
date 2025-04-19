import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import ProductItem from '../ProductItem';
import { useAuth } from '../../context/AuthContext';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Products = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const token = user?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      try {
        const response = await axios.get('https://agrofixcore.onrender.com/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setProducts(response.data);
          setApiStatus(apiStatusConstants.success);
        }
      } catch (error) {
        setErrorMessage('Failed to load products.');
        setApiStatus(apiStatusConstants.failure);
      }
    };

    fetchProducts();
  }, [token]);

  const renderProductsView = () => (
    <div className="row">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );

  const renderFailureView = () => (
    <div className="text-center text-danger">
      <p>{errorMessage}</p>
    </div>
  );

  const renderLoadingView = () => (
    <div className="text-center">
      <div className="spinner-border text-success" role="status" />
      <p className="mt-2">Loading...</p>
    </div>
  );

  const renderProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center text-success mb-4">Available Products 🛒</h2>
        {renderProducts()}
      </div>
    </>
  );
};

export default Products;
