// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { fullName, email, password });
      toast.success('Signup successful');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error('Signup failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={signup}>
        <div className="mb-4">
          <label className="block text-primary">Full Name</label>
          <input
            type="text"
            className="w-full p-2 rounded border"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
