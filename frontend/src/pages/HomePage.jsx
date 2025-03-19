// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Fetch featured products (assuming your backend supports a featured flag)
    axios.get('/api/products?featured=true')
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.div className="animate-fadeIn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="hero-banner bg-accent text-black p-8 rounded mb-8">
        <h2 className="text-4xl font-bold">Big Promotion!</h2>
        <p>Get up to 30% off on genuine original parts.</p>
      </div>

      {/* Main Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border p-2 rounded"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <Link to={`/products?search=${encodeURIComponent(searchTerm)}`} className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
        Browse Products
      </Link>

      {/* Featured Products Section */}
      {featured.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map(product => (
              <Link key={product.id} to={`/products/${product.id}`} className="border p-4 rounded hover:shadow-lg transition">
                <img src={product.images[0] || '/placeholder.jpg'} alt={product.name} className="w-full h-48 object-cover mb-2" />
                <h3 className="font-bold text-lg">{product.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <a
          href="https://wa.me/yourwhatsappnumber"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-2 rounded inline-block"
        >
          Chat with Support on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export default HomePage;
