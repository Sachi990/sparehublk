// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaBars, FaTimes, FaUserCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);

  // When user is not logged in, clicking wishlist/cart will redirect to login.
  const handleWishlistClick = () => {
    if (!auth.user) {
      navigate('/login');
    } else {
      navigate('/wishlist');
    }
  };

  const handleCartClick = () => {
    if (!auth.user) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <header className="bg-light text-primary p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <motion.h1 
          className="text-2xl font-bold" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          <Link to="/">SpareHub.LK</Link>
        </motion.h1>
        <nav>
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link className="hover:text-accent transition" to="/products">
                Products
              </Link>
            </li>
            {/* Always show wishlist icon */}
            <li className="relative">
              <button 
                onClick={handleWishlistClick} 
                className="flex items-center hover:text-accent transition"
              >
                <FaHeart size={20} />
                <span className="hidden lg:inline ml-1">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            </li>
            {/* Always show cart icon */}
            <li className="relative">
              <button 
                onClick={handleCartClick} 
                className="flex items-center hover:text-accent transition"
              >
                <FaShoppingCart size={20} />
                <span className="hidden lg:inline ml-1">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </li>
            {auth.user ? (
              <>
                {auth.role === 'admin' && (
                  <li>
                    <Link className="hover:text-accent transition" to="/admin">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={logout} className="hover:text-accent transition">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="hover:text-accent transition" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-accent transition" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link className="hover:text-accent transition" to="/settings">
                <FaUserCog size={20} />
              </Link>
            </li>
          </ul>
          <button className="md:hidden" onClick={toggleMenu}>
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </nav>
      </div>
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-light text-primary shadow-md"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
        >
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link to="/products" onClick={toggleMenu}>
                Products
              </Link>
            </li>
            <li>
              <button 
                onClick={() => { toggleMenu(); handleWishlistClick(); }} 
                className="flex items-center"
              >
                <FaHeart size={20} className="mr-2" /> Wishlist
              </button>
            </li>
            <li>
              <button 
                onClick={() => { toggleMenu(); handleCartClick(); }} 
                className="flex items-center"
              >
                <FaShoppingCart size={20} className="mr-2" /> Cart
              </button>
            </li>
            {auth.user ? (
              <>
                {auth.role === 'admin' && (
                  <li>
                    <Link to="/admin" onClick={toggleMenu}>
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={() => { toggleMenu(); logout(); }} className="flex items-center">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={toggleMenu}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={toggleMenu}>
                    Signup
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/settings" onClick={toggleMenu} className="flex items-center">
                <FaUserCog size={20} className="mr-2" /> Settings
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
