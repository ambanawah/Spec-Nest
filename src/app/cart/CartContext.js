"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth(); // Use the authentication context
  const [cartItems, setCartItems] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (user && user.id !== 'guest') {
        fetchCart();
    } else {
        // Load guest cart from local storage
        const guestCart = localStorage.getItem('guestCart');
        setCartItems(guestCart ? JSON.parse(guestCart) : []);
    }
  }, [user]); // Re-fetch cart when user logs in or out

  const getAuthHeaders = () => {
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const fetchCart = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error("Failed to fetch cart");
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (user && user.id !== 'guest') {
      try {
        await fetch(`${API_URL}/api/cart/item`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ productId: product.id, quantity }),
        });
        fetchCart(); // Refresh cart from DB
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      // Guest user logic remains the same
      const updatedCart = [...cartItems];
      const existingItem = updatedCart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity });
      }
      setCartItems(updatedCart);
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = async (productId) => {
    if (user && user.id !== 'guest') {
        try {
            await fetch(`${API_URL}/api/cart/item/${productId}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });
            fetchCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    } else {
        // Guest user logic remains the same
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
