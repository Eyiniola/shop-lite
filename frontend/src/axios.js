import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend API root
  withCredentials: true, // Include cookies for auth (if using sessions/JWT in cookies)
});

// Optional: Add a request interceptor for setting auth headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or from cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

