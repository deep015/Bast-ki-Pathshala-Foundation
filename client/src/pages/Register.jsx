import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/applicants", formData);
      setSuccess(
        "🎉 Your application has been received successfully. Thank you for registering with us."
      );
      setError("");
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 px-4 py-10 text-center">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">
          Volunteer with Basti Ki Pathshala
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Join our mission to educate underprivileged children in rural and
          village communities. Fill out the form below to become a volunteer and
          help make a difference.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Volunteer Registration
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 px-4 py-2 rounded text-sm">
            {error}
          </p>
        )}

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded text-sm font-semibold shadow-sm text-left space-y-1">
            <p>{success}</p>
            <p className="text-sm text-green-700 mt-1">
              📩 A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong>. Please check your inbox.
            </p>
          </div>
        )}

        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={loading}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={loading}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={loading}
            />

            <textarea
              name="message"
              placeholder="Why do you want to volunteer?"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={loading}
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}

        {success && (
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white w-full py-2 rounded font-semibold transition"
          >
            Return to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
