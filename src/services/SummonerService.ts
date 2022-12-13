import type ErrorResponse from '@/domains/ErrorResponse';
import type NewSummonerRequest from '@/domains/NewSummonerRequest';
import type SummonerResponse from '@/domains/SummonerResponse';
import type SummonerRoleResponse from '@/domains/SummonerRoleResponse';
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

const get = async () => {
  try {
    const { data } = await HttpClient.get<SummonerResponse>('/v1/summoners');
    return data;
  } catch (error) {
    const { response } = error as AxiosError<ErrorResponse>;
    throw new Error(response?.data.message);
  }
};

const getRole = async (code: string) => {
  try {
    const { data } = await HttpClient.get<SummonerRoleResponse>(`/v1/summoners/${code}/role`);
    return data;
  } catch (error) {
    const { response } = error as AxiosError<ErrorResponse>;
    throw new Error(response?.data.message);
  }
};

export default {
  register,
  get,
  getPositionBySummonerCode: getRole,
};
