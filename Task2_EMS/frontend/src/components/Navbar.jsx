import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navbar Component
 * @param {boolean} isLoggedIn - User authentication status
 * @param {function} setIsLoggedIn - Function to handle logout (handleLogout from App.jsx)
 * @param {string} userRole - Current user role ('admin' or 'user')
 */
const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole }) => {
  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      
      {/* --- Brand Logo --- */}
      <Link 
        to={isLoggedIn ? "/home" : "/"} 
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
          <span className="text-white font-bold">P</span>
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">AuthShield</span>
      </Link>

      {/* --- Desktop Navigation --- */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link to={isLoggedIn ? "/home" : "/"} className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        
        {/* Conditional Dashboard Link for Admins Only */}
        {isLoggedIn && userRole === 'admin' && (
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
        )}
        
        <Link to="/about" className="hover:text-blue-600 transition-colors">
          About
        </Link>
      </div>

      {/* --- Auth Section --- */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Link 
              to="/login" 
              className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-all"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* User Profile Info */}
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900 leading-none">Harshita</span>
              <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mt-1">
                {userRole}
              </span>
            </div>
            
            {/* Logout Action */}
            <button 
              onClick={setIsLoggedIn} 
              className="px-5 py-2 text-sm font-semibold text-red-500 border border-red-100 rounded-full hover:bg-red-50 hover:border-red-200 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;