import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaBars, FaTimes, FaUserCog, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <header className="bg-light text-primary p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <motion.h1 className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/">SpareHub.LK</Link>
        </motion.h1>
        <nav>
          <ul className="hidden md:flex space-x-4 items-center">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/wishlist"><FaHeart /></Link></li>
            <li><Link to="/cart"><FaShoppingCart /></Link></li>
            <li>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="border rounded pl-8 pr-2 py-1"
                />
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/settings"><FaUserCog /></Link></li>
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
            <li><Link to="/products" onClick={toggleMenu}>Products</Link></li>
            <li><Link to="/wishlist" onClick={toggleMenu}><FaHeart /> Wishlist</Link></li>
            <li><Link to="/cart" onClick={toggleMenu}><FaShoppingCart /> Cart</Link></li>
            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
            <li><Link to="/signup" onClick={toggleMenu}>Signup</Link></li>
            <li><Link to="/settings" onClick={toggleMenu}><FaUserCog /> Settings</Link></li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
