// src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success('Admin logged in successfully!');
      navigate('/admin'); // Redirect to the admin dashboard
    } catch (error) {
      console.error('Admin login error:', error.response?.data || error.message);
      toast.error('Admin login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <div className="mb-4">
          <label className="block text-primary">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
          Login as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
