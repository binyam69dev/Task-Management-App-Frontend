import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../api/taskService';
import toast from 'react-hot-toast';

// Main hook for task management
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      const tasksData = response.data?.tasks || response.data || [];
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      toast.success('Task created successfully');
      await fetchTasks();
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData);
      toast.success('Task updated successfully');
      await fetchTasks();
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      throw err;
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const response = await taskService.updateTaskStatus(id, status);
      toast.success(`Task status updated to ${status}`);
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, status } : task
      ));
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
      await fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
};

// Hook for task statistics
export const useTaskStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await taskService.getTaskStats();
        setStats(response.data?.stats || response.data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch task stats:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return { stats, loading, error };
};

// Hook for creating a task (with navigation)
export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await taskService.createTask(taskData);
      toast.success('Task created successfully!');
      navigate('/tasks');
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTask, loading };
};

// Hook for editing a task
export const useEditTask = (id) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTask(id);
      setTask(response.data?.task || response.data);
    } catch (err) {
      toast.error('Failed to load task');
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskData) => {
    try {
      setUpdating(true);
      const response = await taskService.updateTask(id, taskData);
      toast.success('Task updated successfully!');
      navigate('/tasks');
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { task, loading, updating, updateTask };
};

// Default export
export default useTasks;
