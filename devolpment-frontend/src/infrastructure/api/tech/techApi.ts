import axios from 'axios';

const techApi = axios.create({
  baseURL: 'http://localhost:3000/api/tech', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

techApi.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

techApi.interceptors.response.use(
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

export default techApi;
