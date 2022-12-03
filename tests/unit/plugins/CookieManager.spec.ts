import CookieManager from '@/plugins/CookieManager';
import cookie from 'cookie';

jest.mock('cookie');

const cookieMock = jest.mocked(cookie);

describe('CookieService', () => {
  beforeEach(() => {
    document.cookie = 'test-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  });
  it('the cookie input should be put into cookies', () => {
    cookieMock.serialize.mockReturnValueOnce('test-cookie=test-value');
    CookieManager.setCookie({
      name: 'test-cookie',
      value: 'test-value',
    });
    expect(document.cookie).toEqual('test-cookie=test-value');
    expect(cookieMock.serialize).toBeCalledTimes(1);
    expect(cookieMock.serialize).toBeCalledWith('test-cookie', 'test-value', { secure: true });
  });
  it('when the cookies exists then the cookie should be retrieved', () => {
    document.cookie = 'test-cookie=test value; 0; path=/';
    cookieMock.parse.mockReturnValueOnce({
      'test-cookie': 'test value',
    });
    const cookieValue = CookieManager.getCookie('test-cookie');
    expect(cookieValue).toBeTruthy();
    expect(cookieMock.parse).toBeCalledTimes(1);
    expect(cookieMock.parse).toBeCalledWith('test-cookie=test value');
  });

  it('when the cookies not exists then the cookie should be empty', () => {
    cookieMock.parse.mockReturnValueOnce({});
    const cookieValue = CookieManager.getCookie('empty-cookie');
    expect(cookieValue).toBeFalsy();
  });
});
