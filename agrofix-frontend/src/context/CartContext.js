import React, { createContext, useContext, useState, useMemo } from 'react';


const CartContext = createContext();


export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (product, quantity = 1) => {
    setCartItems((prevCartItems) => {
      const exists = prevCartItems.find((item) => item.id === product.id);
      if (exists) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity }];
      }
    });
  };
  

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  const clearCart = () => setCartItems([]);


  const value = useMemo(() => {


    const getCartCount = () =>
      cartItems.reduce((total, item) => total + item.quantity, 0);


    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => {
        const priceMatch = item.price.match(/₹(\d+)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        return total + price * item.quantity;
      }, 0);
    };


    const updateQuantity = (id, quantity) => {
      if (isNaN(quantity) || quantity <= 0) {
        removeFromCart(id);
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          )
        );
      }
    };
  
    return {
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      getCartCount,
      getTotalPrice,
    };
  }, [cartItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
