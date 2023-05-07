/* import { InternalAxiosRequestConfig } from './../../node_modules/axios/index.d'; */
import axios, { InternalAxiosRequestConfig } from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
/* const token = localStorage.getItem("token"); */

const axiosInstance = axios.create({
  baseURL: backendUrl,
});
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;