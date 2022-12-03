import AuthService from '@/services/AuthService';
import CookieService from '@/services/CookieService';

jest.mock('@/services/CookieService');

const cookieServiceMock = jest.mocked(CookieService);

describe('AuthService', () => {
  it('when the auth cookie not exists then the summoner should not logged in', () => {
    cookieServiceMock.getCookie.mockReturnValueOnce('');
    expect(AuthService.isLoggedIn()).toBeFalsy();
    expect(cookieServiceMock.getCookie).toBeCalledTimes(1);
    expect(cookieServiceMock.getCookie).toBeCalledWith('auth-token');
  });
  it('when the auth cookie exists then the summoner should be logged in', () => {
    cookieServiceMock.getCookie.mockReturnValueOnce('abc');
    expect(AuthService.isLoggedIn()).toBeTruthy();
  });

  it('when the summoner has access token then the auth cookie should be saved', () => {
    AuthService.handle({ access_token: 'abc', token_type: 'bearer' });
    expect(cookieServiceMock.setCookie).toBeCalledTimes(1);
    expect(cookieServiceMock.setCookie).toBeCalledWith({ name: 'auth-token', value: 'abc' });
  });
});
