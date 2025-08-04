import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-br from-blue-200 to-indigo-300 text-center animate-fade-in">
     

      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow">
        Welcome to <span className="text-indigo-700">Basti Ki Pathshala</span>
      </h1>

      <p className="max-w-2xl text-gray-700 text-lg sm:text-xl mb-8 leading-relaxed font-medium">
        This is an NGO registration portal where we work to promote education among poor and underprivileged children in rural villages.
        <br className="hidden sm:block" />
        Join us as a volunteer and be a part of the change!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
        <Link
          to="/register"
          className="bg-white text-indigo-700 px-6 py-3 rounded shadow hover:bg-gray-100 font-semibold transition duration-200"
        >
          Apply as Volunteer
        </Link>

        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 font-semibold transition duration-200"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
