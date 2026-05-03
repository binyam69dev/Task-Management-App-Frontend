import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import ThemeSwitcher from '../Common/ThemeSwitcher';
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

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/about', label: 'About', icon: FiInfo },
    { path: '/features', label: 'Features', icon: FiStar },
  ];

  const authLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FiLayout },
    { path: '/tasks', label: 'My Tasks', icon: FiCheckCircle },
    { path: '/tasks/create', label: 'Create', icon: FiPlusCircle },
  ];

  return (
    <>
<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-200 dark:border-gray-700">        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">TE</span>
                </div>
              </div>
              <div className="hidden xs:block">
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  TaskEdu
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">University Task Manager</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200"                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors"                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeSwitcher />
              
              {isAuthenticated ? (
                <>
                  {/* Notification Bell */}
                  <button className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FiBell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="relative">
                        <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <span className="hidden lg:inline text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {user?.name?.split(' ')[0] || 'User'}
                      </span>
                    </button>

                    {showDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-20 border dark:border-gray-700">
                          <div className="px-4 py-3 border-b dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{user?.email}</p>
                          </div>
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setShowDropdown(false)}
                          >
                            <FiUser className="w-4 h-4" />
                            <span className="text-sm">Profile Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full text-left border-t dark:border-gray-700"
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
                <div className="hidden sm:flex space-x-2">
                  <Link
                    to="/login"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {mobileMenuOpen ? <FiX className="w-5 h-5 sm:w-6 sm:h-6" /> : <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="px-3 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors"                 
 onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-base font-medium">{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors"            
      onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-base font-medium">{link.label}</span>
                </Link>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-3 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-3 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium"
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

      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default Navbar;
