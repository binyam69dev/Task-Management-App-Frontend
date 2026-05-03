import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, FiClock, FiUsers, FiAward, FiShield, FiTrendingUp,
  FiMessageCircle, FiCalendar, FiBarChart2, FiUpload, FiShare2, FiBell
} from 'react-icons/fi';

const FeaturesPage = () => {
  const features = [
    { icon: FiCheckCircle, title: 'Smart Task Creation', description: 'Create tasks with due dates, priorities, and categories instantly.' },
    { icon: FiClock, title: 'Time Tracking', description: 'Track time spent on each task with built-in timer.' },
    { icon: FiUsers, title: 'Team Collaboration', description: 'Share tasks and collaborate with classmates.' },
    { icon: FiCalendar, title: 'Calendar Integration', description: 'Sync tasks with your academic calendar.' },
    { icon: FiBarChart2, title: 'Analytics Dashboard', description: 'Visual insights into your productivity patterns.' },
    { icon: FiBell, title: 'Smart Reminders', description: 'Get notified about upcoming deadlines.' },
    { icon: FiUpload, title: 'File Attachments', description: 'Upload and share relevant documents.' },
    { icon: FiShare2, title: 'Easy Sharing', description: 'Share progress with instructors.' },
    { icon: FiMessageCircle, title: 'In-App Chat', description: 'Discuss tasks with team members.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Everything you need to succeed in your academic journey
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4"><span className="text-lg">/month</span></p>
              <ul className="space-y-2 mb-6">
                <li>Up to 50 tasks/month</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
              <button className="btn-primary w-full">Get Started</button>
            </div>
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl p-6 text-center transform scale-105 shadow-xl">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">.99<span className="text-lg">/month</span></p>
              <ul className="space-y-2 mb-6">
                <li>Unlimited tasks</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
                <li>Team collaboration</li>
              </ul>
              <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 w-full">
                Get Pro
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="space-y-2 mb-6">
                <li>Custom solutions</li>
                <li>Dedicated support</li>
                <li>API access</li>
                <li>On-premise deployment</li>
              </ul>
              <button className="btn-primary w-full">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
