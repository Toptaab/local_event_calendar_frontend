/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken } from '../utils/local-storage';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API;

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
