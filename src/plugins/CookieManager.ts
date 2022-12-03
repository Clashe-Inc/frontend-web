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

export default {
  setCookie,
  getCookie,
};
