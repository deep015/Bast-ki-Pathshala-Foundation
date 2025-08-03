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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">All Volunteer Applicants</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {applicants.length === 0 ? (
          <p className="text-center text-gray-600">No applicants found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map(applicant => (
                  <tr key={applicant._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{applicant.name}</td>
                    <td className="p-2">{applicant.email}</td>
                    <td className="p-2">{applicant.phone}</td>
                    <td className="p-2">{applicant.message}</td>
                    <td className="p-2">{new Date(applicant.createdAt).toLocaleString()}</td>
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
