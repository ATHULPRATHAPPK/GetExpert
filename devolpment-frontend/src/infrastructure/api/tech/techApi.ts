import axios from 'axios';

const adminApi = axios.create({
  baseURL: 'http://localhost:3000/api/tech', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

adminApi.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

adminApi.interceptors.response.use(
  response => {
    if (response.headers['set-cookie']) {
      console.log('technician Cookies set:', response.headers['set-cookie']);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default adminApi;
