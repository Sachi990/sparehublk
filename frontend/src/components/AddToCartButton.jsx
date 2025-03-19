// src/components/AddToCartButton.jsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Product added to cart!');
  };

  return (
    <button onClick={handleAddToCart} className="p-2 hover:text-accent transition-colors">
      <FaShoppingCart />
    </button>
  );
}

export default AddToCartButton;
