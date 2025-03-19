// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error('Login failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={login}>
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
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
