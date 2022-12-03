import AuthService from '@/services/AuthService';
import CookieManager from '@/plugins/CookieManager';
import HttpClient from '@/plugins/HttpClient';

jest.mock('@/plugins/CookieManager');
jest.mock('@/plugins/HttpClient');

const cookieManagerMock = jest.mocked(CookieManager);
const httpClientMock = jest.mocked(HttpClient);

describe('AuthService', () => {
  it('when the auth cookie not exists then the summoner should not logged in', () => {
    cookieManagerMock.getCookie.mockReturnValueOnce('');

    expect(AuthService.isLoggedIn()).toBeFalsy();
    expect(cookieManagerMock.getCookie).toBeCalledTimes(1);
    expect(cookieManagerMock.getCookie).toBeCalledWith('auth-token');
  });
  it('when the auth cookie exists then the summoner should be logged in', () => {
    cookieManagerMock.getCookie.mockReturnValueOnce('abc');

    expect(AuthService.isLoggedIn()).toBeTruthy();
  });

  it('when the summoner has access token then the auth cookie should be saved', () => {
    AuthService.handle({ access_token: 'abc', token_type: 'bearer' });

    expect(cookieManagerMock.setCookie).toBeCalledTimes(1);
    expect(cookieManagerMock.setCookie).toBeCalledWith({ name: 'auth-token', value: 'abc' });
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

    const data = await AuthService.authenticate({
      username: 'username@test.com',
      password: 'abc123',
    });

    expect(data.access_token).toBe('abc123');
    expect(data.token_type).toBe('bearer');
    const { calls } = postMock.mock;
    expect(calls[0][0]).toBe('/v1/summoners/login');
    expect(calls[0][1].get('username')).toBe('username@test.com');
    expect(calls[0][1].get('password')).toBe('abc123');
  });
  it('the summoner should not be authenticated', () => {
    const postMock = jest
      .fn()
      .mockRejectedValue({
        response: {
          data: {
            message: 'abc123',
          },
        },
      });
    httpClientMock.post = postMock;
    AuthService.authenticate({
      username: 'username@test.com',
      password: 'abc123',
    }).catch((err) => expect(err.message).toBe('abc123'));
  });
});
