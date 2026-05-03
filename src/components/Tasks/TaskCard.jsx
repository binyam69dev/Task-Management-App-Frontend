import React from 'react';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onDelete }) => {
  const navigate = useNavigate();
  
  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      high: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    };
    return colors[priority] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  const getStatusColor = (status) => {
    const colors = {
      'todo': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
      'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'done': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    };
    return colors[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/tasks/${task._id}/edit`)}
            className="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={"px-2 py-1 rounded-full text-xs font-medium " + getPriorityColor(task.priority)}>
          {task.priority}
        </span>
        <span className={"px-2 py-1 rounded-full text-xs font-medium " + getStatusColor(task.status)}>
          {task.status?.replace('-', ' ')}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <FiClock className="w-4 h-4" />
            <span>{format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
          </div>
          {task.completed && (
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <FiCheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
