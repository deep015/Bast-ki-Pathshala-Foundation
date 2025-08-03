import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Volunteer Portal</h1>
      <div className="space-x-4">
        <Link to="/register" className="bg-white px-6 py-2 rounded shadow hover:bg-gray-100 font-medium">Apply as Volunteer</Link>
        <Link to="/login" className="bg-white px-6 py-2 rounded shadow hover:bg-gray-100 font-medium">Admin Login</Link>
      </div>
    </div>
  );
};

export default Home;
