import { shallowMount } from '@vue/test-utils';
import UserMenuComponent from '@Components/UserMenu.vue';

describe('UserMenuComponent', () => {
  const $router = {
    push: jest.fn(),
  };
  it('when the exit button is clicked then the router should redirect to Login View', () => {
    const wrapper = shallowMount(UserMenuComponent, {
      mocks: {
        $router,
      },
    });
    const btnAvatar = wrapper.find('#user-menu-list');
    btnAvatar.trigger('click');
    const btnExit = wrapper.find('#user-menu-btn-exit');

    btnExit.vm.$emit('click');

    expect($router.push).toBeCalledTimes(1);
    expect($router.push).toBeCalledWith({
      name: 'Login',
    });
  });
});
