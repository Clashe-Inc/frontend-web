import { authStore } from '@/stores/AuthStore';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const authInterceptor = (config: AxiosRequestConfig) => {
  const authToken = authStore.getToken();
  if (authToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
};

const onRejected = (error: AxiosError) => {
  if (error.response?.status === 401) {
    authStore.removeAuth();
  }
  return Promise.reject(error);
};

http.interceptors.request.use(authInterceptor);
http.interceptors.response.use(undefined, onRejected);

export default http;
