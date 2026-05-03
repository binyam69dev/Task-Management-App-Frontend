import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../store/ThemeProvider';
import { FiSun, FiMoon, FiMonitor, FiCheck } from 'react-icons/fi';

const ThemeSwitcher = () => {
  const { theme, setLightTheme, setDarkTheme, setSystemThemePreference, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Bright and clean interface',
      icon: FiSun,
      action: setLightTheme,
      isActive: theme === 'light'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes, great for night',
      icon: FiMoon,
      action: setDarkTheme,
      isActive: theme === 'dark'
    },
    {
      id: 'system',
      name: 'System Default',
      description: 'Matches your device theme',
      icon: FiMonitor,
      action: setSystemThemePreference,
      isActive: theme === 'system'
    }
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
          {isDark ? (
            <FiMoon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          ) : (
            <FiSun className="w-5 h-5 text-yellow-500" />
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-80 z-20 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Customize Theme</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose your preferred appearance</p>
              </div>
              <div className="p-3 space-y-2">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => {
                      themeOption.action();
                      setIsOpen(false);
                    }}
                    className="w-full p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-md">
                        <themeOption.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-900 dark:text-white">{themeOption.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{themeOption.description}</p>
                      </div>
                      {themeOption.isActive && (
                        <FiCheck className="w-4 h-4 text-primary-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
