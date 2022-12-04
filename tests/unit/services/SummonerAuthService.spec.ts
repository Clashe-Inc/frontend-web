import SummonerAuthService from '@/services/SummonerAuthService';
import CookieManager from '@/plugins/CookieManager';
import HttpClient from '@/plugins/HttpClient';

jest.mock('@/plugins/CookieManager');
jest.mock('@/plugins/HttpClient');

const cookieManagerMock = jest.mocked(CookieManager);
const httpClientMock = jest.mocked(HttpClient);

describe('SummonerAuthService', () => {
  it('when the auth cookie not exists then the summoner should not be authenticated', () => {
    cookieManagerMock.getCookie.mockReturnValueOnce('');

    expect(SummonerAuthService.isAuthenticated()).toBeFalsy();
    expect(cookieManagerMock.getCookie).toBeCalledTimes(1);
    expect(cookieManagerMock.getCookie).toBeCalledWith('auth-token');
  });
  it('when the auth cookie exists then the summoner should be authenticated', () => {
    cookieManagerMock.getCookie.mockReturnValueOnce('abc');

    expect(SummonerAuthService.isAuthenticated()).toBeTruthy();
  });
  it('the summoner should be authenticated', async () => {
    const postMock = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          access_token: 'abc123',
          token_type: 'bearer',
        },
      });
    httpClientMock.post = postMock;

    await SummonerAuthService.authenticate({
      username: 'username@test.com',
      password: 'abc123',
    });
    const { calls } = postMock.mock;
    expect(calls[0][0]).toBe('/v1/summoners/login');
    expect(calls[0][1].get('username')).toBe('username@test.com');
    expect(calls[0][1].get('password')).toBe('abc123');
    expect(cookieManagerMock.setCookie).toBeCalledTimes(1);
    expect(cookieManagerMock.setCookie).toBeCalledWith({ name: 'auth-token', value: 'abc123' });
  });
  it('the summoner should not be authenticated', async () => {
    expect.assertions(1);
    const postMock = jest
      .fn()
      .mockRejectedValue({
        response: {
          data: {
            message: 'message error',
          },
        },
      });
    httpClientMock.post = postMock;
    try {
      await SummonerAuthService.authenticate({
        username: 'username@test.com',
        password: 'abc123',
      });
    } catch (error) {
      const err = error as Error;
      expect(err.message).toEqual('message error');
    }
  });
  it('the summoner auth should be removed', () => {
    SummonerAuthService.removeAuth();
    expect(cookieManagerMock.removeCookie).toBeCalledTimes(1);
    expect(cookieManagerMock.removeCookie).toBeCalledWith('auth-token');
  });
});
