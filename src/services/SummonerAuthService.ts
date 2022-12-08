import type ErrorResponse from '@/domains/ErrorResponse';
import type SummonerAuthRequest from '@/domains/SummonerAuthRequest';
import type SummonerAuthResponse from '@/domains/SummonerAuthResponse';
import HttpClient from '@/plugins/HttpClientPlugin';
import type { AxiosError } from 'axios';

const authenticate = async (request: SummonerAuthRequest) => {
  const formData = new FormData();
  formData.append('username', request.username);
  formData.append('password', request.password);
  try {
    const { data } = await HttpClient.post<SummonerAuthResponse>('/v1/summoners/login', formData);
    return data;
  } catch (error) {
    const { response } = error as AxiosError<ErrorResponse>;
    throw new Error(response?.data.message);
  }
};

export default {
  authenticate,
};
