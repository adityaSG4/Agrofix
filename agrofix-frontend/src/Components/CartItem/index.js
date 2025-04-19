import React from 'react';
import { IoAdd } from "react-icons/io5";
import { IoRemoveOutline } from "react-icons/io5";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
    return (
        <li className="list-group-item border-0 shadow-sm p-3 rounded-3 mb-3 d-flex justify-content-between align-items-center bg-light">
            <div className="d-flex align-items-center">
                <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-3 me-3"
                    style={{
                        width: '100px',
                        height: '80px',
                        objectFit: 'cover',
                        border: '2px solid #e0e0e0',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                />
                <div className="d-flex flex-column justify-content-between">
                    <h5 className="mb-1 fw-semibold text-dark">{item.name}</h5>
                    <p className="mb-2 text-muted small">Price: {item.price}</p>
                    <div className="d-flex align-items-center gap-2">
                        <button
                            className="btn btn-sm btn-outline-secondary rounded-circle"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            title="Decrease"
                        >
                            <IoRemoveOutline size={18} />
                        </button>
                        <span className="fw-semibold px-2">{item.quantity}</span>
                        <button
                            className="btn btn-sm btn-outline-secondary rounded-circle"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Increase"
                        >
                            <IoAdd size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <button
                className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1"
                onClick={() => removeFromCart(item.id)}
            >
                Remove
            </button>
        </li>
    );
};

export default CartItem;
