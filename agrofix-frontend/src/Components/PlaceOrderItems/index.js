import React from 'react';

const PlaceOrderItems = ({ item }) => {
    const priceMatch = item.price.match(/₹(\d+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

  return (
    <li key={item.id} className="list-group-item d-flex justify-content-between">
      <span>{item.name} x {item.quantity}</span>
      <span>₹{price* item.quantity}</span>
    </li>
  );
};

export default PlaceOrderItems;
