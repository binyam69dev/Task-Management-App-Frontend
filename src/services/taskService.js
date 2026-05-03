import API from './api';

export const taskService = {
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await API.get(`/tasks${params ? `?${params}` : ''}`);
    return response.data;
  },
  
  getTask: async (id) => {
    const response = await API.get(`/tasks/${id}`);
    return response.data;
  },
  
  createTask: async (taskData) => {
    const response = await API.post('/tasks', taskData);
    return response.data;
  },
  
  updateTask: async (id, taskData) => {
    const response = await API.put(`/tasks/${id}`, taskData);
    return response.data;
  },
  
  deleteTask: async (id) => {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await API.get('/tasks/stats');
    return response.data;
  },
};

