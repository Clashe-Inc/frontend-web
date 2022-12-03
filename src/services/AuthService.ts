import AuthResponse from '@/domains/AuthResponse';
import ErrorResponse from '@/domains/ErrorResponse';
import AuthRequest from '@/domains/AuthRequest';
import HttpClient from '@/plugins/HttpClient';
import { AxiosError } from 'axios';
import CookieManager from '@/plugins/CookieManager';

const isLoggedIn = () => !!CookieManager.getCookie('auth-token');

const handle = (response: AuthResponse) => {
  CookieManager.setCookie({
    name: 'auth-token',
    value: response.access_token,
  });
};

const authenticate = async (request: AuthRequest) => {
  const formData = new FormData();
  formData.append('username', request.username);
  formData.append('password', request.password);
  try {
    const { data } = await HttpClient.post<AuthResponse>(
      '/v1/summoners/login',
      formData,
    );
    return data;
  } catch (error) {
    const { response } = error as AxiosError<ErrorResponse>;
    throw new Error(response?.data.message);
  }
};

export default {
  isLoggedIn,
  handle,
  authenticate,
};
