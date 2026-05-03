import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../store/ThemeProvider';
import { FiSun, FiMoon, FiMonitor, FiCheck, FiSliders, FiEye, FiSmartphone } from 'react-icons/fi';

const Settings = () => {
  const { theme, setLightTheme, setDarkTheme, setSystemThemePreference, isDark } = useTheme();

  const themeOptions = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Perfect for bright environments and daytime use',
      icon: FiSun,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      action: setLightTheme,
      isActive: theme === 'light',
      previewColors: ['#fef3c7', '#fde68a', '#fcd34d']
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Reduces eye strain, great for night time',
      icon: FiMoon,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      action: setDarkTheme,
      isActive: theme === 'dark',
      previewColors: ['#4f46e5', '#7c3aed', '#8b5cf6']
    },
    {
      id: 'system',
      name: 'System Theme',
      description: 'Automatically matches your device settings',
      icon: FiMonitor,
      color: 'from-gray-500 to-gray-700',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
      borderColor: 'border-gray-200 dark:border-gray-700',
      action: setSystemThemePreference,
      isActive: theme === 'system',
      previewColors: ['#6b7280', '#4b5563', '#374151']
    }
  ];

  const currentTheme = themeOptions.find(t => t.isActive) || themeOptions[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Theme Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Customize your visual experience</p>
      </div>

      {/* Current Theme Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border-2 p-8"
      >
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
              <currentTheme.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentTheme.name} Active
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {currentTheme.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentTheme.previewColors.map((color, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full shadow-md"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Theme Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {themeOptions.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={option.action}
            className="relative group text-left transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all">
              {/* Active Badge */}
              {option.isActive && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <option.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {option.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {option.description}
              </p>

              {/* Preview */}
              <div className="flex items-center space-x-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <FiEye className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Live Preview</span>
                <div className="flex ml-auto space-x-1">
                  {option.previewColors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FiPalette className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Auto Dark Mode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Automatically switches based on time</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FiEye className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Eye Protection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Reduces blue light exposure</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FiSmartphone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Sync Across Devices</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Theme preferences saved</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
