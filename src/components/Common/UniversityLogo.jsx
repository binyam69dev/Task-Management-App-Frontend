import React from 'react';

const UniversityLogo = ({ className = "h-10 w-auto" }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path d="M50 20 L20 45 L50 70 L80 45 L50 20Z" stroke="currentColor" strokeWidth="3" fill="none"/>
          <rect x="42" y="45" width="16" height="25" stroke="currentColor" strokeWidth="3" fill="none"/>
          <line x1="50" y1="45" x2="50" y2="70" stroke="currentColor" strokeWidth="2"/>
          <path d="M35 40 L50 30 L65 40" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="50" cy="40" r="3" fill="currentColor"/>
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight">TaskEdu</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">University Task Manager</p>
      </div>
    </div>
  );
};

export default UniversityLogo;
