import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import Vuetify from 'vuetify';

describe('HomeView', () => {
  const $router = {
    getRoutes: jest.fn().mockReturnValue([
      {
        name: 'Route 1',
        meta: {
          icon: 'icon-1',
          name: 'name-1',
        },
      },
      {
        name: 'Route 2',
        meta: {},
      },
    ]),
  };
  const vuetify = new Vuetify();

  it('when the home view is rendered with 1 route with meta then the menu items should have 1 item', () => {
    const wrapper = shallowMount(HomeView, {
      mocks: {
        $router,
      },
      stubs: ['RouterView'],
      vuetify,
    });

    const menu = wrapper.find('#home-view-menu');
    expect(menu.props().items).toHaveLength(1);
  });

  it('when the nav bar icon is clicked then the drawer should be changed it', () => {
    const wrapper = shallowMount(HomeView, {
      mocks: {
        $router,
      },
      stubs: ['RouterView'],
      vuetify,
    });

    const navBarIcon = wrapper.find('#home-view-nav-icon');
    navBarIcon.trigger('click');

    expect(wrapper.vm.$data.drawer).toBeFalsy();
  });
});
