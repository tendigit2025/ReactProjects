import { ToastContainer , toast, Bounce } from 'react-toastify';
import React, { createContext, useContext, useState, useMemo } from 'react';
// Create Context
const CartContext = createContext();
import { initialProducts } from '../data/product';

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const products = initialProducts;

  //add item to cart
  const addToCart = (product) => {
    toast.success('Item Added to Cart', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
}); 
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
 //Remove Item from cart 
 const removeFromCart = (productId,removeAll = false) => {
  toast.success('Item Removed from Cart', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
}); 
   setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if(!existingItem) return prevCart;
      if (removeAll || existingItem.quantity ===1) {
        return prevCart.filter(item=>item.id !== productId) 
      } else {
        return prevCart.map(item=> item.id === productId ? {...item, quantity: item.quantity-1}:item)
      }
    });
  }

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0), [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]
  );

  return (
    <CartContext.Provider value={{ products, cart, 
    addToCart, clearCart, removeFromCart, cartTotal, cartCount}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);

