// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist on mount
  useEffect(() => {
    axios
      .get('/api/wishlist')
      .then((res) => setWishlistItems(res.data))
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        toast.error("Failed to load wishlist");
      });
  }, []);

  const addToWishlist = async (productId) => {
    try {
      const res = await axios.post('/api/wishlist', { productId });
      setWishlistItems((prev) => [...prev, res.data]);
      toast.success("Product added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add product to wishlist");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      setWishlistItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Product removed from wishlist!");
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      toast.error("Failed to remove product from wishlist");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
