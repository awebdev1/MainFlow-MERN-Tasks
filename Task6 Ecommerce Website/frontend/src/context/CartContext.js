import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const updateCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart');
      setCartItems(res.data);
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Cart update error:", err);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider 
      value={{ 
        cartCount, 
        cartItems, 
        updateCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};