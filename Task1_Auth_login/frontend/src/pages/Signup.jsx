import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios'; // Make sure this path matches your axios config file

const Signup = () => {
  // 1. Setup State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending data to your backend /register route
      const { data } = await API.post('/register', formData);
      
      if (data.success) {
        alert("Account created successfully!");
        navigate('/dashboard'); // Redirect to login page
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
        <p className="text-slate-500 mb-8 text-sm">Join us to start managing your secure profile.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1 tracking-wider">Full Name</label>
            <input 
              type="text" 
              name="name" // Matches the key in formData
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Harshita" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1 tracking-wider">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@email.com" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1 tracking-wider">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 ${loading ? 'bg-slate-400' : 'bg-slate-900'} text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;