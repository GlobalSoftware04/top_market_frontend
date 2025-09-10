// useAxiosInterceptor.js
import { useEffect } from 'react';
import api from './index';
import { useAuth } from '../../context/AuthContext';

const useAxiosInterceptor = () => {
  // const logout = useAuth();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          // logout(); // global logout on 401
        }
        return Promise.reject(error);
      }
    );

    // Clean up on unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default useAxiosInterceptor;
