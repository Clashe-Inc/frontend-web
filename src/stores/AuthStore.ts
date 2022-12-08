import type SummonerAuthResponse from '@/domains/SummonerAuthResponse';
import CookieManagerPlugin from '@/plugins/CookieManagerPlugin';
import { reactive } from 'vue';

const AUTH_TOKEN = 'auth-token';
export const authStore = reactive({
  isAuthenticated: !!CookieManagerPlugin.getCookie(AUTH_TOKEN),

  setAuthentication(authResponse: SummonerAuthResponse) {
    CookieManagerPlugin.setCookie(AUTH_TOKEN, authResponse.access_token);
    this.isAuthenticated = true;
  },

  getToken() {
    return CookieManagerPlugin.getCookie(AUTH_TOKEN);
  },
  removeAuth() {
    CookieManagerPlugin.removeCookie(AUTH_TOKEN);
    this.isAuthenticated = false;
  },
});
