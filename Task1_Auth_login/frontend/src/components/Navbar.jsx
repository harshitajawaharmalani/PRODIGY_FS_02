import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Replace this state with your actual Auth Context later
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">P</span>
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">AuthShield</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link to={"/"}>Home</Link>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/about"}>About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">Welcome, Harshita</span>
            <button 
              onClick={() => setIsLoggedIn(false)}
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