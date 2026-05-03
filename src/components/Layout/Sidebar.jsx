import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiList, 
  FiPlusCircle, 
  FiBarChart2, 
  FiUser,
  FiSettings,
  FiCalendar,
  FiBell
} from 'react-icons/fi';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/tasks', icon: FiList, label: 'All Tasks' },
    { path: '/tasks/create', icon: FiPlusCircle, label: 'Create Task' },
    { path: '/calendar', icon: FiCalendar, label: 'Calendar' },
    { path: '/statistics', icon: FiBarChart2, label: 'Statistics' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <nav className="flex-1 py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              lex items-center space-x-3 px-6 py-3 mx-2 rounded-lg transition-all duration-200 
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* User Info at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <FiUser className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
