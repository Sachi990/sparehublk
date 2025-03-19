import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    axios.get('/api/wishlist')
      .then((res) => setWishlistItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const removeItem = (id) => {
    axios.delete(`/api/wishlist/${id}`)
      .then(() => setWishlistItems(wishlistItems.filter((item) => item.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-accent text-2xl mb-4">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>Product ID: {item.productId}</span>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;
