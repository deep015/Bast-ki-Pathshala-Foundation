import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      return setError("Username and password required");
    }

    try {
      const res = await axios.post('/admin/login', credentials);
      localStorage.setItem("adminToken", res.data.token);
      setError('');
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        aria-label="Admin Login Form"
      >
        
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
          Welcome Back, Admin!
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Please enter your credentials to access the dashboard.
        </p>

       

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded text-center text-sm">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            autoComplete="current-password"
          />
        </div>

          <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition"
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => navigate('/')} 
        className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-md font-semibold transition"
      >
        Return to Home
      </button>
      </form>
    </div>
  );
};

export default Login;
