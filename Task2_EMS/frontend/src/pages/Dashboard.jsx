import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    salary: ''
  });

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get('/employees');
      setEmployees(data.employees);
    } catch (err) {
      console.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/employee/add', formData);
      setShowModal(false); 
      setFormData({ firstName: '', lastName: '', email: '', position: '', salary: '' }); // Reset form
      fetchEmployees();    
      alert("Employee added successfully!");
    } catch (err) {
      alert("Error adding employee. Check if email is unique.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await API.delete(`/employee/${id}`);
        fetchEmployees();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await API.get('/logout');
      setIsAuthenticated(false);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Manage your employee records securely.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200"
          >
            + Add Employee
          </button>
          <button 
            onClick={handleLogout}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-xl font-semibold hover:bg-slate-100 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 text-xs font-bold uppercase text-slate-400 tracking-wider">Employee Name</th>
              <th className="p-5 text-xs font-bold uppercase text-slate-400 tracking-wider">Position</th>
              <th className="p-5 text-xs font-bold uppercase text-slate-400 tracking-wider">Email</th>
              <th className="p-5 text-xs font-bold uppercase text-slate-400 tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(emp => (
                <tr key={emp._id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                  <td className="p-5 font-medium text-slate-700">{emp.firstName} {emp.lastName}</td>
                  <td className="p-5 text-slate-600">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">{emp.position}</span>
                  </td>
                  <td className="p-5 text-slate-500">{emp.email}</td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => handleDelete(emp._id)} 
                      className="text-red-500 font-bold hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-slate-400">No employees found. Click "+ Add Employee" to start.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- ADD EMPLOYEE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">New Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="First Name" required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                <input 
                  type="text" placeholder="Last Name" required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <input 
                type="email" placeholder="Email Address" required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="text" placeholder="Position (e.g. Developer)" required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              />
              <input 
                type="number" placeholder="Salary" required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
              />
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Save Record
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;