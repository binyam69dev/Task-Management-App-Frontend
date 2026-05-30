import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import { FiList, FiGrid, FiPlus } from 'react-icons/fi';
import KanbanBoard from '../components/KanbanBoard';

const Tasks = () => {
  const { tasks, loading, deleteTask } = useTasks();
  const [view, setView] = useState('list'); // 'list' or 'board'
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your tasks efficiently</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${view === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            >
              <FiList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('board')}
              className={`p-2 rounded ${view === 'board' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={() => navigate('/tasks/create')}
            className="btn-primary flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No tasks yet. Create your first task!</p>
            </div>
          )}
        </div>
      ) : (
        <KanbanBoard />
      )}
    </div>
  );
};

export default Tasks;
