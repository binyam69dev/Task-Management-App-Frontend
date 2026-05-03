import React, { useState } from 'react';
import { useTasks, useDeleteTask, useUpdateTask } from '../hooks/useTasks';
import TaskCard from '../components/Tasks/TaskCard';
import TaskBoard from '../components/Tasks/TaskBoard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import AdvancedFilters from '../components/Common/AdvancedFilters';
import ExportTasks from '../components/Common/ExportTasks';
import { FiSearch, FiGrid, FiList } from 'react-icons/fi';

const Tasks = () => {
  const [view, setView] = useState('list');
  const [filters, setFilters] = useState({});
  const { data, isLoading } = useTasks(filters);
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  if (isLoading) return <LoadingSpinner />;

  const tasks = data?.data?.tasks || [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask.mutateAsync(id);
    }
  };

  const handleUpdate = async (id, updates) => {
    await updateTask.mutateAsync({ id, data: updates });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          
          <AdvancedFilters onFilterChange={handleFilterChange} />
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('list')}
              className={'px-3 py-2 ' + (view === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700') + ' transition-colors'}
            >
              <FiList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('board')}
              className={'px-3 py-2 ' + (view === 'board' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700') + ' transition-colors'}
            >
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
          
          <ExportTasks tasks={tasks} />
        </div>
      </div>

      {tasks.length > 0 ? (
        view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <TaskBoard 
            tasks={tasks} 
            onTaskUpdate={handleUpdate}
            onDeleteTask={handleDelete}
          />
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks found</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
