import ErrorResponse from '@/domains/ErrorResponse';
import SummonerLoginRequest from '@/domains/SummonerLoginRequest';
import SummonerLoginResponse from '@/domains/SummonerLoginResponse';
import HttpClient from '@/plugins/HttpClient';
import { AxiosError } from 'axios';

const authenticate = async (request: SummonerLoginRequest) => {
  const formData = new FormData();
  formData.append('username', request.username);
  formData.append('password', request.password);
  try {
    const { data } = await HttpClient.post<SummonerLoginResponse>(
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
  authenticate,
};
