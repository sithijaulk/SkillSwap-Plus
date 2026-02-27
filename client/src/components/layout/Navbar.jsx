import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'border-b-2 border-blue-600' : '';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            SkillSwap+
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className={`px-3 py-2 ${isActive('/')}`}>Home</Link>
            <Link to="/skills" className={`px-3 py-2 ${isActive('/skills')}`}>Skills</Link>
            <Link to="/community" className={`px-3 py-2 ${isActive('/community')}`}>Community</Link>
            <Link to="/about" className={`px-3 py-2 ${isActive('/about')}`}>About Us</Link>
            <Link to="/contact" className={`px-3 py-2 ${isActive('/contact')}`}>Contact Us</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="hidden md:flex gap-4">
              <Link to="/auth/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">{user?.firstName?.charAt(0) || 'U'}</div>
                  <span className="font-medium">{user?.firstName} {user?.lastName ? user.lastName : ''}</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50">Profile</Link>
                    <Link to={user?.role === 'mentor' ? '/mentor/dashboard' : user?.role === 'learner' ? '/learner/dashboard' : '/admin/dashboard'} className="block px-4 py-2 hover:bg-gray-50">Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">Logout</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded hover:bg-gray-100">☰</button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="p-3 flex flex-col gap-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-2 py-2">Home</Link>
            <Link to="/skills" onClick={() => setMenuOpen(false)} className="px-2 py-2">Skills</Link>
            <Link to="/community" onClick={() => setMenuOpen(false)} className="px-2 py-2">Community</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="px-2 py-2">About Us</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="px-2 py-2">Contact Us</Link>

            {!isAuthenticated ? (
              <>
                <Link to="/auth/login" onClick={() => setMenuOpen(false)} className="px-2 py-2">Login</Link>
                <Link to="/auth/register" onClick={() => setMenuOpen(false)} className="px-2 py-2">Register</Link>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-2 py-2">Profile</Link>
                <Link to={user?.role === 'mentor' ? '/mentor/dashboard' : user?.role === 'learner' ? '/learner/dashboard' : '/admin/dashboard'} onClick={() => setMenuOpen(false)} className="px-2 py-2">Dashboard</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="px-2 py-2 text-red-600 text-left">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
