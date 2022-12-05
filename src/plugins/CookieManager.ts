import CookieInput from '@/domains/CookieInput';
import cookie from 'cookie';

const setCookie = ({ name, value }: CookieInput) => {
  document.cookie = cookie.serialize(name, value, {
    secure: true,
  });
};

const getCookie = (name: string) => {
  const decodedCookie = cookie.parse(document.cookie);
  return decodedCookie[name] ?? '';
};

const removeCookie = (name: string) => {
  const expires = new Date(Date.UTC(1970, 0, 1, 1, 1, 1, 1));
  document.cookie = cookie.serialize(name, '', {
    expires,
  });
};

export default {
  setCookie,
  getCookie,
  removeCookie,
};
