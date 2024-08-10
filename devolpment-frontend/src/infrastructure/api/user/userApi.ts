// src/infrastructure/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    // Add authorization token if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default api;
