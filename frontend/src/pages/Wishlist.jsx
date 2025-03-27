// src/pages/Wishlist.jsx
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-accent text-2xl mb-4">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productImage || '/placeholder.jpg'}
                  alt={item.productName || "Wishlist Product"}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <Link to={`/products/${item.productId}`} className="text-lg font-semibold hover:text-accent transition">
                    {item.productName || `Product ID: ${item.productId}`}
                  </Link>
                  {item.productDescription && (
                    <p className="text-sm text-gray-600">{item.productDescription}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-2 sm:mt-0 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
              >
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
