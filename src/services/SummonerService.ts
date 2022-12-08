import type ErrorResponse from '@/domains/ErrorResponse';
import type NewSummonerRequest from '@/domains/NewSummonerRequest';
import type SummonerResponse from '@/domains/SummonerResponse';
import HttpClient from '@/plugins/HttpClientPlugin';
import type { AxiosError } from 'axios';

const register = async (request: NewSummonerRequest) => {
  try {
    const { data } = await HttpClient.post<SummonerResponse>('/v1/summoners', request);
    return data;
  } catch (error) {
    const { response } = error as AxiosError<ErrorResponse>;
    throw new Error(response?.data.message);
  }
};

export default {
  register,
};
