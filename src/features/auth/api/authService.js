import API from '../../../services/api';

export const authService = {
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Backend returns: { status, token, data: { user } }
      const user = response.data.data?.user || response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      console.log('Login API response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Backend returns: { status, token, data: { user } }
        const user = response.data.data?.user || response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User stored:', user);
      }
      return response.data;
    } catch (error) {
      console.error('Login API error:', error.response?.data || error.message);
      throw error;
    }
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
    if (response.data.data?.user) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },
};

export default authService;
