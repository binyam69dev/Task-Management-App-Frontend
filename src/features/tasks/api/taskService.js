import API from '../../../services/api';

export const taskService = {
  getTasks: async () => {
    const response = await API.get('/tasks');
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

  updateTaskStatus: async (id, status) => {
    const response = await API.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await API.delete(`/tasks/${id}`);
    return response.data;
  },

  getTaskStats: async () => {
    const response = await API.get('/tasks/stats');
    return response.data;
  },
};

export default taskService;
