import React, { useState } from 'react';
import axios from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return setError("All fields are required");
    }

    try {
     const res = await axios.post('/applicants', formData);
      setSuccess(res.data.msg);
      setError('');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.msg || "Submission failed");
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Volunteer Registration</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          name="message"
          placeholder="Why do you want to volunteer?"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-2 rounded font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
