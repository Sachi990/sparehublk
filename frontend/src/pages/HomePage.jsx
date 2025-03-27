// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import jwtDecode from 'jwt-decode';
import Slider from 'react-slick'; // Carousel library
import SearchAutoComplete from '../components/SearchAutoComplete';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [userName, setUserName] = useState('');

  // Decode token for personalized greeting
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.fullName) {
          setUserName(decoded.fullName);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Fetch featured products
  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await axios.get('/api/products', { params: { featured: true, limit: 6 } });
        // Expecting res.data.data as an array
        setFeaturedProducts(res.data.data || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    }
    fetchFeatured();
  }, []);

  // Fetch trending products (adjust criteria as needed)
  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await axios.get('/api/products', { params: { limit: 6, sort: 'trending' } });
        setTrendingProducts(res.data.data || []);
      } catch (error) {
        console.error('Error fetching trending products:', error);
        setTrendingProducts([]);
      }
    }
    fetchTrending();
  }, []);

  // For demonstration, using sample testimonials
  useEffect(() => {
    const sampleTestimonials = [
      { id: 1, text: "Great service and high-quality products!", author: "Alice" },
      { id: 2, text: "Fast delivery and excellent customer support.", author: "Bob" },
      { id: 3, text: "I love the variety of spare parts available!", author: "Charlie" },
    ];
    setTestimonials(sampleTestimonials);
  }, []);

  // Slider settings for featured products
  const featuredSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  // Slider settings for testimonials
  const testimonialSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // When a suggestion is selected, navigate to the product detail page
  const handleSuggestionSelect = (suggestion) => {
    window.location.href = `/products/${suggestion.id}`;
  };

  return (
    <motion.div 
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Personalized Greeting */}
      {userName && (
        <div className="mb-4 text-right text-lg text-gray-700">
          Welcome back, <span className="font-semibold">{userName}</span>!
        </div>
      )}

      {/* Animated Hero Banner */}
      <div className="relative bg-accent text-black rounded-lg overflow-hidden mb-8">
        <img 
          src="/hero-banner.jpg" 
          alt="Promotional Banner" 
          className="w-full h-64 object-cover opacity-70"
          loading="lazy"
        />
        <motion.div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Big Promotion!</h1>
          <p className="text-lg md:text-xl mb-6">
            Get up to 30% off on genuine original parts. Shop now and save!
          </p>
          <Link 
            to="/products" 
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>

      {/* Advanced Search AutoComplete */}
      <div className="mb-8">
        <SearchAutoComplete 
          placeholder="Search for parts, brands, models..."
          onSelectSuggestion={handleSuggestionSelect}
        />
      </div>

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <Slider {...featuredSliderSettings}>
            {featuredProducts.map(product => (
              <div key={product.id} className="p-2">
                <Link 
                  to={`/products/${product.id}`} 
                  className="border p-4 rounded hover:shadow-lg transition transform hover:scale-105"
                >
                  <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} 
                    alt={product.name} 
                    className="w-full h-48 object-cover mb-2 rounded"
                    loading="lazy"
                  />
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  {product.featured && (
                    <span className="bg-yellow-300 text-xs px-2 py-1 rounded inline-block mt-1">
                      Featured
                    </span>
                  )}
                </Link>
                <p className="text-accent font-semibold mt-2">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </p>
                {product.discount > 0 && (
                  <p className="line-through text-gray-500">${product.price.toFixed(2)}</p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Trending Products Section */}
      {trendingProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {trendingProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`} 
                className="border p-4 rounded hover:shadow-lg transition transform hover:scale-105"
              >
                <img 
                  src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} 
                  alt={product.name} 
                  className="w-full h-48 object-cover mb-2 rounded"
                  loading="lazy"
                />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-accent font-semibold mt-2">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Carousel */}
      {testimonials.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <Slider {...testimonialSliderSettings}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="p-4 text-center">
                <p className="italic text-gray-700 mb-2">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.author}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Call-to-Action Section */}
      <div className="text-center mt-8">
        <Link 
          to="/products" 
          className="bg-accent text-black py-3 px-6 rounded hover:bg-yellow-600 transition text-xl"
        >
          Browse All Products
        </Link>
      </div>

      {/* Footer Contact CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-700 mb-2">Need help? Chat with our support team!</p>
        <a 
          href="https://wa.me/yourwhatsappnumber" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition inline-block"
        >
          Contact Us on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export default HomePage;
