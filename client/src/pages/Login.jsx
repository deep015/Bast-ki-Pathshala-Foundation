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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded font-medium"
        >
          Login
                </button>
                <button
        onClick={() => {
            localStorage.removeItem("adminToken");
            navigate('/login');
        }}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 float-right"
        >
        Logout
        </button>
      </form>
    </div>
  );
};

export default Login;
