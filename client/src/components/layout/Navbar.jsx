<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null); // Mock user state for UI development
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
            <div className="container mx-auto px-6">
                <div className={`glass-morphism rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <span className="text-white font-bold text-xl">S+</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            SkillSwap+
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/programs" className="text-slate-300 hover:text-white transition-colors font-medium">Programs</Link>
                        <Link to="/community" className="text-slate-300 hover:text-white transition-colors font-medium">Community</Link>
                        <Link to="/about" className="text-slate-300 hover:text-white transition-colors font-medium">About Us</Link>
                        <Link to="/contact" className="text-slate-300 hover:text-white transition-colors font-medium">Contact Us</Link>
                    </div>

                    {/* User Section */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-white/5 transition-all text-slate-300 hover:text-white border border-transparent hover:border-white/10"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                                {user?.profileImage ? (
                                    <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                            </div>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-3 w-56 glass-morphism rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                                {!user ? (
                                    <>
                                        <Link to="/login" className="flex items-center px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                            Login
                                        </Link>
                                        <Link to="/register" className="flex items-center px-4 py-3 text-sm text-white premium-gradient rounded-xl mt-1 shadow-lg shadow-indigo-500/10">
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <div className="px-4 py-3 border-b border-white/5 mb-1">
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Logged in as</p>
                                            <p className="text-sm font-semibold truncate">{user.firstName} {user.lastName}</p>
                                        </div>
                                        <Link to={`/dashboard/${user.role}`} className="flex items-center px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-all mt-1"
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
=======
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
>>>>>>> 1129752f430480f1b93703b0bd3b58554d88858c
};

export default Navbar;
