import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const ProductItem = ({ product }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-lg border-0 rounded-lg overflow-hidden transform-hover">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{
            objectFit: 'cover',
            height: '200px',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
        />
        <div className="card-body text-center p-3">
          <h5 className="card-title text-success mb-3">{product.name}</h5>
          <p className="card-text text-muted mb-3">{product.price}</p>
          <Link
            to={`/products/${product.id}`}
            className="btn btn-success px-4 py-2 rounded-pill shadow-sm transition-transform transform-hover"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
