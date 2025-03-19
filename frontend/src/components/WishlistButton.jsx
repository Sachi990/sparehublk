import React from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function WishlistButton({ productId, onAdded }) {
  const addToWishlist = async () => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        '/api/wishlist',
        { productId },
        { headers: { Authorization: token } }
      );
      toast.success('Added to wishlist!');
      if (onAdded) onAdded();
    } catch (error) {
      console.error('Error adding to wishlist:', error.response?.data || error.message);
      toast.error('Failed to add to wishlist');
    }
  };

  return (
    <button onClick={addToWishlist} className="p-2 hover:text-accent transition-colors">
      <FaHeart />
    </button>
  );
}

export default WishlistButton;
