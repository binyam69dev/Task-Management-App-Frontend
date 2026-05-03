import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiGlobe, FiHeart } from 'react-icons/fi';

const AboutUs = () => {
  const team = [
    { name: 'Dr. Sarah Johnson', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Prof. Michael Chen', role: 'CTO', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Dr. Emily Rodriguez', role: 'Head of Product', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Prof. David Kim', role: 'Lead Developer', image: 'https://randomuser.me/api/portraits/men/4.jpg' }
  ];

  const values = [
    { icon: FiTarget, title: 'Our Mission', text: 'To empower students with tools that enhance their academic productivity and success.' },
    { icon: FiUsers, title: 'Our Vision', text: 'Creating a world where every student can achieve their full potential through organized task management.' },
    { icon: FiHeart, title: 'Our Values', text: 'Innovation, Integrity, Excellence, and Student Success are at the core of everything we do.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TaskEdu</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Revolutionizing academic task management for universities worldwide
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Founded in 2024, TaskEdu began with a simple idea: help students organize their academic lives better. 
                What started as a small university project has grown into a comprehensive task management platform 
                used by thousands of students across multiple universities.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Today, we're proud to be the leading task management solution for educational institutions, 
                helping students achieve their academic goals through better organization and collaboration.
              </p>
            </div>
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white">
              <FiGlobe className="w-16 h-16 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Our Impact</h3>
              <p className="text-lg mb-2">🏆 50,000+ Active Users</p>
              <p className="text-lg mb-2">📚 100+ Partner Universities</p>
              <p className="text-lg">⭐ 4.9/5 User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Meet Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
