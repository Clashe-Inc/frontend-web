import CookieManager from '@/plugins/CookieManager';
import cookie from 'cookie';

jest.mock('cookie');

const cookieMock = jest.mocked(cookie);

describe('CookieManager', () => {
  beforeEach(() => {
    document.cookie = 'test-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    cookieMock.parse.mockReset();
    cookieMock.serialize.mockReset();
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

  it('the cookie should be removed', () => {
    cookieMock.serialize
      .mockReturnValueOnce('test-cookie=test-value')
      .mockReturnValueOnce('test-cookie=; expires=Thu, 01 Jan 1970 04:01:01 UTC');
    CookieManager.setCookie({
      name: 'test-cookie',
      value: 'test-value',
    });
    CookieManager.removeCookie('test-cookie');

    expect(cookieMock.serialize).toBeCalledWith(
      'test-cookie',
      '',
      { expires: new Date('1970-01-01T04:01:01.001Z') },
    );
    expect(document.cookie).toBe('');
  });
});
