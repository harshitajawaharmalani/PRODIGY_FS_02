import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home';

function App() {
  // This will eventually be replaced by your JWT/Auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar 
  isLoggedIn={isAuthenticated} 
  setIsLoggedIn={handleLogout} 
  userRole={userRole} 
/>
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setIsAuthenticated={handleLoginSuccess} isAuthenticated={isAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />

          <Route 
            path="/home" 
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
          />
          
          {/* Protected Route Logic */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated && userRole === 'admin' ? 
              <Dashboard setIsAuthenticated={handleLogout} /> : 
              (isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />)
            } 
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;