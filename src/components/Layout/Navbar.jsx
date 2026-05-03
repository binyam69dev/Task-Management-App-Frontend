import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import ThemeSwitcher from "../Common/ThemeSwitcher";
import { 
  FiLogOut, 
  FiUser, 
  FiBell, 
  FiMenu, 
  FiX,
  FiHome,
  FiInfo,
  FiStar,
  FiCheckCircle,
  FiPlusCircle,
  FiLayout
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/about', label: 'About', icon: FiInfo },
    { path: '/features', label: 'Features', icon: FiStar },
  ];

  const authLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FiLayout },
    { path: '/tasks', label: 'My Tasks', icon: FiCheckCircle },
    { path: '/tasks/create', label: 'Create Task', icon: FiPlusCircle },
  ];

  return (
    <>
<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TE</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  TaskEdu
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">University Task Manager</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"                >
                  <link.icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"                >
                  <link.icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              <ThemeSwitcher />
              
              {isAuthenticated ? (
                <>
                  {/* Notification Bell */}
                  <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="relative">
                        <div className="w-9 h-9 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                          <span className="text-white font-semibold text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <span className="hidden lg:inline text-gray-700 dark:text-gray-300 font-medium">
                        {user?.name?.split(' ')[0] || 'User'}
                      </span>
                    </button>

                    {showDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-20 border dark:border-gray-700">
                          <div className="px-4 py-3 border-b dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                          </div>
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setShowDropdown(false)}
                          >
                            <FiUser className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Profile Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full text-left border-t dark:border-gray-700"
                          >
                            <FiLogOut className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600 dark:text-red-400">Logout</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex space-x-2">
                  <Link
                    to="/login"
                    className="px-5 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;


