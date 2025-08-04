import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchApplicants = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get('/applicants', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicants(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load applicants');
      }
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow"
        >
          Logout
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          All Volunteer Applicants
        </h2>

        {error && (
          <p className="text-center text-red-600 bg-red-100 border border-red-200 rounded p-3 mb-4">
            {error}
          </p>
        )}

        {applicants.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No applicants found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Message</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applicants.map((applicant) => (
                  <tr key={applicant._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{applicant.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{applicant.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{applicant.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{applicant.message}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {applicant.date ? applicant.date.substring(0, 10) : "No Date"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
