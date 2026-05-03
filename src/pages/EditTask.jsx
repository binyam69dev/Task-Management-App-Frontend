import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks, useUpdateTask } from '../hooks/useTasks';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useTasks();
  const updateTask = useUpdateTask();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  });
  
  const task = data?.data?.tasks?.find(t => t._id === id);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo'
      });
    }
  }, [task]);

  if (isLoading) return <LoadingSpinner />;
  if (!task) return <div className="text-center py-12">Task not found</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask.mutateAsync({ id, data: formData });
    navigate('/tasks');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateTask.isLoading}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {updateTask.isLoading ? 'Updating...' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

