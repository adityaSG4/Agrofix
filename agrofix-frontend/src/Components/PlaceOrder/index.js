import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuth } from '../../context/AuthContext';
import PlaceOrderItems from '../PlaceOrderItems';  

const PlaceOrder = () => {
    const { cartItems, clearCart } = useCart();
    const [address, setAddress] = useState('');
    const [paymentMode, setPaymentMode] = useState('COD');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();
    const token = user?.token;

    const handlePlaceOrder = async () => {
        if (!address) {
            setError('Address is required.');
            return;
        }

        try {
            const products = cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
            }));

            await axios.post(
                'https://agrofixcore.onrender.com/orders',
                { address, paymentMode, products },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            clearCart();
            navigate('/my-orders');
        } catch (err) {
            console.error(err);
            setError('Failed to place order.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="text-success mb-4">📝 Place Your Order</h2>
                <ul className="list-group mb-4">
                    {cartItems.map(item => (
                        <PlaceOrderItems key={item.id} item={item} />
                    ))}
                </ul>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                        className="form-control"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        rows="3"
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label">Payment Mode</label>
                    <select
                        className="form-select"
                        value={paymentMode}
                        onChange={e => setPaymentMode(e.target.value)}
                    >
                        <option value="COD">Cash on Delivery</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Credit/Debit Card</option>
                    </select>
                </div>
                {error && <p className="text-danger mb-3">{error}</p>}
                <button className="btn btn-success btn-lg px-4" onClick={handlePlaceOrder}>
                    ✅ Confirm Order
                </button>
            </div>
        </>
    );
};

export default PlaceOrder;
