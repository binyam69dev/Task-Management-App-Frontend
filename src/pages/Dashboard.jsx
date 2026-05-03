import React, { useState, useEffect } from 'react';
import { useTasks, useTaskStats } from '../hooks/useTasks';
import StatCard from '../components/Dashboard/StatCard';
import TaskCard from '../components/Tasks/TaskCard';
import TaskAnalytics from '../components/Dashboard/TaskAnalytics';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ExportTasks from '../components/Common/ExportTasks';
import { FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

const Dashboard = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [columns, setColumns] = useState(4);
  const { data: tasksData, isLoading: tasksLoading } = useTasks();
  const { data: statsData, isLoading: statsLoading } = useTaskStats();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (tasksLoading || statsLoading) {
    return <LoadingSpinner />;
  }

  const tasks = tasksData?.data?.tasks || [];
  const stats = statsData?.data || {};

  const statCards = [
    { title: 'Total Tasks', value: stats.total || 0, icon: FiCheckCircle, color: 'from-blue-500 to-blue-600' },
    { title: 'Completed', value: stats.completed || 0, icon: FiTrendingUp, color: 'from-green-500 to-green-600' },
    { title: 'In Progress', value: stats.inProgress || 0, icon: FiClock, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Overdue', value: stats.overdue || 0, icon: FiAlertCircle, color: 'from-red-500 to-red-600' },
  ];

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 lg:px-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
          >
            <FiBarChart2 className="w-4 h-4" />
            <span className="hidden xs:inline">{showAnalytics ? 'Hide' : 'Show'} Analytics</span>
          </button>
          <ExportTasks tasks={tasks} />
        </div>
      </div>

      {/* Stats Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Analytics Section */}
      {showAnalytics && (
        <div className="overflow-x-auto">
          <TaskAnalytics tasks={tasks} />
        </div>
      )}

      {/* Recent Tasks */}
      <div className="card p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Tasks
        </h2>
        {recentTasks.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {recentTasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={() => {}} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create your first task!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
