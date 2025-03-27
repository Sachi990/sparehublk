// src/components/AdminHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <motion.h1 className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/admin">Admin Dashboard</Link>
        </motion.h1>
        <nav>
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link className="hover:text-accent transition" to="/admin/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent transition" to="/admin/orders">
                Orders
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent transition" to="/admin/reports">
                Reports
              </Link>
            </li>
            <li>
              <button onClick={logout} className="hover:text-accent transition">
                Logout
              </button>
            </li>
          </ul>
          <button className="md:hidden" onClick={toggleMenu}>
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </nav>
      </div>
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-800 text-white shadow-md"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
        >
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link to="/admin/products" onClick={toggleMenu}>Products</Link>
            </li>
            <li>
              <Link to="/admin/orders" onClick={toggleMenu}>Orders</Link>
            </li>
            <li>
              <Link to="/admin/reports" onClick={toggleMenu}>Reports</Link>
            </li>
            <li>
              <button onClick={() => { toggleMenu(); logout(); }}>
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

export default AdminHeader;
