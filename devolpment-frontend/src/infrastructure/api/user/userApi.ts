
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    response => {
        if (response.headers['set-cookie']) {
          console.log('Cookies set:', response.headers['set-cookie']);
        }
        console.log("responce.header=>",response.headers);
        
        return response;
      },
      error => {
        return Promise.reject(error);
      }
);

export default api;
