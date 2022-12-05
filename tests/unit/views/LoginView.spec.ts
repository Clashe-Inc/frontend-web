import ButtonSuccessVue from '@/components/buttons/ButtonSuccess.vue';
import SummonerAuthRequest from '@/domains/SummonerAuthRequest';
import SummonerAuthService from '@/services/SummonerAuthService';
import LoginView from '@/views/LoginView.vue';
import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

jest.mock('@/services/SummonerAuthService');
const summonerAuthServiceMock = jest.mocked(SummonerAuthService);

describe('LoginView', () => {
  const vuetify = new Vuetify();
  let wrapper: Wrapper<Vue>;
  const refLoginFormMock = { validate: jest.fn() };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  beforeEach(() => {
    summonerAuthServiceMock.removeAuth.mockClear();
    summonerAuthServiceMock.authenticate.mockClear();
    wrapper = mount(LoginView, {
      vuetify,
      computed: {
        refLoginForm: () => refLoginFormMock,
      },
      mocks,
    });
  });
  it('when login view is created then the summoner auth should remove the authentication', () => {
    expect(summonerAuthServiceMock.removeAuth).toBeCalledTimes(1);
  });
  it('when login click is emitted and the form is valid then the summoner should be authenticated', async () => {
    refLoginFormMock.validate.mockReturnValueOnce(true);
    summonerAuthServiceMock.authenticate.mockResolvedValueOnce();

    await wrapper.setData({
      summonerLogin: {
        username: 'summoner1',
        password: 'summonerpass',
      } as SummonerAuthRequest,
    });
    const buttonSuccess = wrapper.findComponent(ButtonSuccessVue);
    await buttonSuccess.trigger('click');
    expect(refLoginFormMock.validate).toHaveBeenCalledTimes(1);
    expect(summonerAuthServiceMock.authenticate).toBeCalledTimes(1);
    expect(summonerAuthServiceMock.authenticate).toBeCalledWith({ password: 'summonerpass', username: 'summoner1' });
    expect(mocks.$router.push).toBeCalledTimes(1);
  });
});
