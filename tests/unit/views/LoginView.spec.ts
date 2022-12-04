import ButtonSuccessVue from '@/components/buttons/ButtonSuccess.vue';
import SummonerAuthService from '@/services/SummonerAuthService';
import LoginView from '@/views/LoginView.vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

jest.mock('@/services/SummonerAuthService');

const summonerAuthServiceMock = jest.mocked(SummonerAuthService);

describe('LoginView', () => {
  let wrapper: Wrapper<Vue>;
  let $router: VueRouter;
  let refLoginFormMock: { validate: CallableFunction };
  let validateMock: jest.Mock;

  beforeEach(() => {
    const vuetify = new Vuetify();
    summonerAuthServiceMock.removeAuth = jest.fn();
    summonerAuthServiceMock.authenticate = jest.fn();
    validateMock = jest.fn();
    $router = jest.mocked(new VueRouter());
    $router.push = jest.fn();
    refLoginFormMock = {
      validate: validateMock,
    };
    wrapper = mount(LoginView, {
      vuetify,
      computed: {
        refLoginForm: () => refLoginFormMock,
      },
      mocks: {
        $router,
      },
    });
  });
  it('when login view is created then the summoner auth should remove the authentication', () => {
    expect(summonerAuthServiceMock.removeAuth).toBeCalledTimes(1);
  });
  it('when login click is emitted and the form is valid then the summoner should be authenticated', async () => {
    validateMock.mockReturnValueOnce(true);
    await wrapper.setData({
      summonerLogin: {
        username: 'summoner1',
        password: 'summonerpass',
      },
    });
    summonerAuthServiceMock.authenticate.mockResolvedValueOnce();
    const buttonSuccess = wrapper.findComponent(ButtonSuccessVue);
    buttonSuccess.trigger('click');

    expect(refLoginFormMock.validate).toBeCalledTimes(1);
    expect(summonerAuthServiceMock.authenticate).toBeCalledTimes(1);
    expect(summonerAuthServiceMock.authenticate).toBeCalledWith({ password: 'summonerpass', username: 'summoner1' });
    expect($router.push).toBeCalledWith(0);
  });
});
