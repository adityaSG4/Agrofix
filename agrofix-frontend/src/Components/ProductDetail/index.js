import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext'; 
import axios from 'axios';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const ProductDetail = () => {
  const { id } = useParams();
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth(); 
  const token = user?.token; 

  useEffect(() => {
    const fetchProduct = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      try {
        const response = await axios.get(`https://agrofixcore.onrender.com/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }}
          );
        if (response.data) {
          setProduct(response.data);
          setApiStatus(apiStatusConstants.success);
        }
      } catch (error) {
        setErrorMessage('Failed to load product details.');
        setApiStatus(apiStatusConstants.failure);
      }
    };

    fetchProduct();
  }, [id, token]); 

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity, quantity);
  };

  const renderQuantityControls = () => (
    <div className="d-flex align-items-center gap-3 mb-3">
      <button
        className="btn btn-outline-secondary rounded-circle"
        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        title="Decrease"
      >
        <IoRemoveOutline size={20} />
      </button>
      <span className="fw-bold fs-5">{quantity}</span>
      <button
        className="btn btn-outline-secondary rounded-circle"
        onClick={() => setQuantity(quantity + 1)}
        title="Increase"
      >
        <IoAdd size={20} />
      </button>
    </div>
  );

  const renderProductDetailsView = () => (
    <div className="row bg-white rounded-4 shadow p-4 align-items-center">
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid rounded-3 border"
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
      </div>
      <div className="col-md-6">
        <h2 className="text-success mb-3 fw-semibold">{product.name}</h2>
        <p className="text-muted mb-4">{product.description}</p>
        <h4 className="text-primary mb-4 fw-bold">{product.price}</h4>

        {renderQuantityControls()}

        <button className="btn btn-success btn-lg px-4 shadow-sm" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
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

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
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
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductDetail;
