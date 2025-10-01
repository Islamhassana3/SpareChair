import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors and network issues
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error - backend is unreachable
    if (!error.response) {
      const networkError = {
        message: 'Cannot connect to server',
        details: 'The backend server is not running or is unreachable. Please ensure the server is started on http://localhost:5000',
        originalError: error.message,
        isNetworkError: true,
      };
      return Promise.reject(networkError);
    }
    
    // Authentication error
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
