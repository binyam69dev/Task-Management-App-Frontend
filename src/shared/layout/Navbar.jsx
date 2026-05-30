import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/store/authContext.jsx';
import ThemeSwitcher from '../../shared/components/ThemeSwitcher.jsx';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiLayout,
  FiSearch,
  FiCommand,
  FiSettings,
  FiHelpCircle,
  FiMail,
  FiCalendar,
  FiTrendingUp,
  FiGrid,
  FiUserCheck
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  // Mock notifications data
  const [notifications] = useState([
    { id: 1, title: 'Task Due Soon', message: 'Complete your project proposal by tomorrow', time: '2 hours ago', read: false, type: 'warning' },
    { id: 2, title: 'New Assignment', message: 'Professor Smith posted a new assignment', time: '5 hours ago', read: false, type: 'info' },
    { id: 3, title: 'Team Meeting', message: 'Sprint planning at 3:00 PM', time: '1 day ago', read: true, type: 'meeting' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShowDropdown(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome, exact: true },
    { path: '/about', label: 'About', icon: FiInfo, exact: false },
    { path: '/features', label: 'Features', icon: FiStar, exact: false },
  ];

  const authLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FiLayout },
    { path: '/tasks', label: 'My Tasks', icon: FiCheckCircle },
    { path: '/tasks/create', label: 'Create Task', icon: FiPlusCircle },
  ];

  const quickActions = [
    { label: 'Create Task', icon: FiPlusCircle, action: () => navigate('/tasks/create') },
    { label: 'View Calendar', icon: FiCalendar, action: () => navigate('/calendar') },
    { label: 'Analytics', icon: FiTrendingUp, action: () => navigate('/analytics') },
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'meeting': return '📅';
      default: return '📌';
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm sm:text-lg">TE</span>
                </div>
              </motion.div>
              <div className="hidden xs:block">
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  TaskEdu
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">University Task Manager</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <motion.div 
                className="relative w-full"
                initial={false}
                animate={{ scale: searchOpen ? 1.02 : 1 }}
              >
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="w-full pl-9 pr-12 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-sm"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <FiCommand className="w-3 h-3" />K
                  </kbd>
                </div>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActive(link.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              
              {isAuthenticated && authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <ThemeSwitcher />
              
              {/* Search Button - Mobile */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiSearch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </button>

              {isAuthenticated ? (
                <>
                  {/* Quick Actions Dropdown */}
                  <div className="relative hidden sm:block">
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiGrid className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Notification Bell */}
                  <div className="relative" ref={notificationRef}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiBell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                      {unreadCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                        />
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {showNotifications && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-2 z-20 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                              {unreadCount > 0 && (
                                <button className="text-xs text-primary-600 hover:text-primary-700">
                                  Mark all as read
                                </button>
                              )}
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                              {notifications.map(notif => (
                                <div
                                  key={notif.id}
                                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                                    !notif.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                                  }`}
                                >
                                  <div className="flex items-start space-x-3">
                                    <span className="text-xl">{getNotificationIcon(notif.type)}</span>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.message}</p>
                                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
                                    </div>
                                    {!notif.read && <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                              <button className="text-sm text-primary-600 hover:text-primary-700 w-full text-center py-1">
                                View all notifications
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="relative">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <span className="hidden lg:inline text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {user?.name?.split(' ')[0] || 'User'}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {showDropdown && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-2 z-20 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{user?.email}</p>
                            </div>
                            
                            {/* Quick Actions */}
                            <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-700">
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 mb-1">Quick Actions</p>
                              {quickActions.map((action, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    action.action();
                                    setShowDropdown(false);
                                  }}
                                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <action.icon className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{action.label}</span>
                                </button>
                              ))}
                            </div>
                            
                            <Link
                              to="/profile"
                              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setShowDropdown(false)}
                            >
                              <FiUser className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">Profile Settings</span>
                            </Link>
                            
                            <Link
                              to="/settings"
                              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setShowDropdown(false)}
                            >
                              <FiSettings className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">Preferences</span>
                            </Link>
                            
                            <Link
                              to="/help"
                              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setShowDropdown(false)}
                            >
                              <FiHelpCircle className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">Help & Support</span>
                            </Link>
                            
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left border-t border-gray-200 dark:border-gray-700 mt-2"
                            >
                              <FiLogOut className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-red-600 dark:text-red-400">Logout</span>
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                    >
                      <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                    >
                      <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg overflow-hidden"
            >
              <div className="px-3 py-4 space-y-1">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 transition-all text-sm"
                  />
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
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
                    className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-base font-medium">{link.label}</span>
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <Link
                      to="/login"
                      className="block px-3 py-3 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-3 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium shadow-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up Free
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="max-w-2xl mx-auto mt-24 px-4"
                onClick={(e) => e.stopPropagation()}
                ref={searchRef}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                  <form onSubmit={handleSearch} className="p-4">
                    <div className="flex items-center space-x-3">
                      <FiSearch className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tasks, projects, or settings..."
                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 text-lg"
                      />
                      <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd>
                    </div>
                  </form>
                  <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">Recent searches</p>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                      🔍 Complete project proposal
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                      📊 View analytics
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default Navbar;