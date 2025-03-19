// src/components/SettingsPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SettingsPanel() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch the logged-in user's profile
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios
      .get('/api/auth/me', { headers: { Authorization: token } })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error('Failed to fetch profile:', err.response?.data || err.message);
        toast.error('Failed to load profile');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow bg-white">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={user.avatar || '/default-avatar.png'} // Ensure you have a default avatar in your public folder
          alt="User Avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-bold">{user.fullName}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="mb-4 space-y-2">
        <li>
          <Link to="/settings/account" className="text-blue-600 hover:underline">
            Account Settings
          </Link>
        </li>
        <li>
          <Link to="/settings/addresses" className="text-blue-600 hover:underline">
            Saved Addresses
          </Link>
        </li>
        <li>
          <Link to="/orders" className="text-blue-600 hover:underline">
            Order History
          </Link>
        </li>
        <li>
          <Link to="/cart" className="text-blue-600 hover:underline">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="text-blue-600 hover:underline">
            Wishlist
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition w-full"
      >
        Logout
      </button>
    </div>
  );
}

export default SettingsPanel;
