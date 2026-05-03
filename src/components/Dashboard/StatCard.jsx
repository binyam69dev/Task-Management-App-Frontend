import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="card p-6 hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
<div className="bg-gradient-to-r p-3 rounded-xl shadow-lg">          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

