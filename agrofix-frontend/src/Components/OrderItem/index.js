import React from 'react';
import { RiProductHuntLine } from "react-icons/ri";


const OrderItem = ({ item }) => {
  const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) {
      return 0;
    }
    return price.toFixed(2);
  };

  return (
    <li className="list-group-item item-list">
      <RiProductHuntLine size={20} className="text-success" /> &nbsp;
      {item.product_name} ({item.product_price}) × {item.quantity} = ₹{formatPrice(item.total_price)}
    </li>
  );
};

export default OrderItem;
