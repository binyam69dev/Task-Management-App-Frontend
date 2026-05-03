import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import { 
  FiHome, 
  FiList, 
  FiPlusCircle, 
  FiBarChart2, 
  FiUser,
  FiSettings,
  FiCalendar,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/tasks', icon: FiList, label: 'All Tasks' },
    { path: '/tasks/create', icon: FiPlusCircle, label: 'Create Task' },
    { path: '/calendar', icon: FiCalendar, label: 'Calendar' },
    { path: '/statistics', icon: FiBarChart2, label: 'Statistics' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  const sidebarContent = (
    <div className={lex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 }>
      {/* Toggle Button (Desktop only) */}
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 z-10 p-1.5 bg-primary-500 text-white rounded-full shadow-md hover:bg-primary-600 transition-all"
        >
          {isCollapsed ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
        </button>
      )}

      {/* User Info */}
      <div className={p-6 border-b border-gray-200 dark:border-gray-700 }>
        <div className={lex }>
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-lg">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || 'User Name'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              lex items-center  px-4 py-3 mx-2 rounded-lg transition-all duration-200 
            }
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className={w-5 h-5 } />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            © 2024 TaskEdu
          </p>
        </div>
      )}
    </div>
  );

  // Mobile sidebar with overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed bottom-4 right-4 z-40 p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg md:hidden"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            ></div>
            <div className="fixed left-0 top-0 bottom-0 z-50 md:hidden animate-slide-in">
              <div className="relative h-full">
                {sidebarContent}
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return sidebarContent;
};

export default Sidebar;

