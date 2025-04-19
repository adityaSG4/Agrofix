import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import CartItem from '../CartItem';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, updateQuantity, getCartCount, getTotalPrice } = useCart();
    const navigate = useNavigate();
    const getNoItemsMessage = () => {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center text-center bg-white p-5 rounded-4 shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
                <img
                    src="https://t3.ftcdn.net/jpg/08/17/86/26/240_F_817862691_LuptAl40w0cKIgOFaMfNpGkrJOBZu6VO.jpg"
                    alt="Empty cart"
                    className="mb-4"
                    style={{
                        width: '10rem',
                        height: '10rem',
                        objectFit: 'contain',

                    }}
                />
                <h4 className="fw-semibold text-secondary mb-2">Your cart is empty 🛒</h4>
                <p className="text-muted mb-4">Looks like you haven't added anything yet. Start exploring our products!</p>
                <Link
                    to="/products"
                    className="btn btn-success px-4 py-2 rounded-pill shadow-sm"
                    style={{ transition: 'all 0.3s ease' }}
                >
                    Explore Products
                </Link>
            </div>
        );
    };

    return (
        <>
            <Navbar /> <div className="container py-5">
                <h2 className="text-success mb-4">🛒 Your Cart</h2>
                {cartItems.length === 0 ? (
                    getNoItemsMessage()
                ) : (
                    <>
                        <ul className="list-group mb-4">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeFromCart={removeFromCart}
                                />
                            ))}
                        </ul>


                        <div className="text-end">
                            <button
                                className="btn btn-outline-danger btn-sm px-4 py-2"
                                onClick={clearCart}
                            >
                                🗑️ Clear Cart
                            </button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4 p-4 rounded-3 shadow-sm bg-light border">
                            <div>
                                <h5 className="text-muted mb-1">Total Items:</h5>
                                <h4 className="text-success">{getCartCount()}</h4>
                            </div>
                            <div>
                                <h5 className="text-muted mb-1">Total Price:</h5>
                                <h4 className="text-success">₹{getTotalPrice()}</h4>
                            </div>
                            <button className="btn btn-success btn-lg px-4 py-2" onClick={() => navigate('/place-order')}>

                                🛍️ Place Order
                            </button>
                        </div>


                    </>
                )}
            </div>
        </>

    );
};

export default Cart;
