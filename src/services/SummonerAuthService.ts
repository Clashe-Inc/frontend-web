import type SummonerAuthResponse from '@/domains/SummonerAuthResponse';
import type ErrorResponse from '@/domains/ErrorResponse';
import type SummonerAuthRequest from '@/domains/SummonerAuthRequest';
import HttpClient from '@/plugins/HttpClientPlugin';
import type { AxiosError } from 'axios';
import CookieManager from '@/plugins/CookieManagerPlugin';

const perform = (response: SummonerAuthResponse) => {
  CookieManager.setCookie({
    name: 'auth-token',
    value: response.access_token,
  });
};

const isAuthenticated = () => !!CookieManager.getCookie('auth-token');

const authenticate = async (request: SummonerAuthRequest) => {
  const formData = new FormData();
  formData.append('username', request.username);
  formData.append('password', request.password);
  try {
    const { data } = await HttpClient.post<SummonerAuthResponse>('/v1/summoners/login', formData);
    perform(data);
  } catch (error) {
    const { response } = error as AxiosError<ErrorResponse>;
    throw new Error(response?.data.message);
  }
};

const removeAuth = () => {
  CookieManager.removeCookie('auth-token');
};

export default {
  isAuthenticated,
  authenticate,
  removeAuth,
};
