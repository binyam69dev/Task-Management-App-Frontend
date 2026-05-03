import API from './api';

export const authService = {
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  updateProfile: async (userData) => {
    const response = await API.patch('/auth/update', userData);
    if (response.data.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },
};
