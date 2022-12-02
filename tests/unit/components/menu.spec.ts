import SideMenu from '@/components/SideMenu.vue';
import { shallowMount } from '@vue/test-utils';

describe('Menu.vue', () => {
  const $route = {
    name: 'Route 1',
  };
  const $router = {
    push: jest.fn(),
  };

  it('when the menu component has a list of items with 1 item then it should be render', () => {
    const items = [{
      name: 'Route 1',
      meta: {
        icon: 'mdi-menu',
        name: 'Menu',
        order: 1,
      },
    }];
    const wrapper = shallowMount(SideMenu, {
      mocks: {
        $route,
      },
      propsData: {
        items,
      },
    });

    const menuItems = wrapper.find('#menu-1');

    expect(menuItems.exists()).toBe(true);
  });
  it('when the second menu item is clicked then the router should redirect to the Route 2', () => {
    const items = [
      {
        name: 'Route 1',
        meta: {
          icon: 'mdi-menu',
          name: 'Menu',
          order: 1,
        },
      },
      {
        name: 'Route 2',
        meta: {
          icon: 'mdi-menu',
          name: 'Menu 2',
          order: 2,
        },
      },
    ];
    const wrapper = shallowMount(SideMenu, {
      mocks: {
        $route,
        $router,
      },
      propsData: {
        items,
      },
    });
    const menuItem = wrapper.find('#menu-2');

    menuItem.vm.$emit('click');

    expect($router.push).toBeCalledTimes(1);
    expect($router.push).toHaveBeenCalledWith({
      name: 'Route 2',
    });
  });
});
