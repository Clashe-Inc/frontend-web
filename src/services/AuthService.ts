import SummonerLoginResponse from '@/domains/SummonerLoginResponse';
import CookieService from './CookieService';

const isLoggedIn = () => {
  const authToken = CookieService.getCookie('auth-token');
  return !!authToken;
};

const handle = (response: SummonerLoginResponse) => {
  CookieService.setCookie({
    name: 'auth-token',
    value: response.access_token,
  });
};

export default {
  isLoggedIn,
  handle,
};
