import React from 'react';

const Dashboard = ({ setIsAuthenticated }) => {

  const handleLogout = async () => {
  try {
    // 1. Call the backend to clear the cookie
    await API.get('/logout'); 
    
    // 2. Clear the local state in App.js
    setIsAuthenticated(false); 
    
    // 3. Optional: Clear any local storage if you used it
    // localStorage.removeItem('user'); 
    
    alert("Logged out successfully!");
  } catch (err) {
    console.error("Logout failed", err);
    // Even if the API fails, we usually want to force logout locally
    setIsAuthenticated(false);
  }
};
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header Section */}
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, Harshita! 👋</h1>
          <p className="text-slate-500 mt-1">Your secure profile is active and protected.</p>
        </div>
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
          H
        </div>
      </div>

      {/* Stats/Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Status</p>
          <p className="text-xl font-bold text-green-500 mt-2">Verified</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Level</p>
          <p className="text-xl font-bold text-slate-900 mt-2">High</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Login</p>
          <p className="text-xl font-bold text-slate-900 mt-2">Just now</p>
        </div>
      </div>

      {/* Action Section */}
      <div className="mt-8 bg-slate-900 p-8 rounded-3xl text-white">
        <h3 className="text-xl font-bold">Need to leave?</h3>
        <p className="text-slate-400 mt-1 mb-6">Always sign out on public devices.</p>
        <button 
          onClick={handleLogout}
          className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-slate-200 transition-all"
        >
          Logout Securely
        </button>
      </div>
    </div>
  );
};

export default Dashboard;