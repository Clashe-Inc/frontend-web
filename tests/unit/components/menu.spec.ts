import MenuComponent from '@Components/Menu.vue';
import { shallowMount } from '@vue/test-utils';

describe('Menu.vue', () => {
  const $route = {
    name: 'Route 1',
  };
  const $router = {
    push: jest.fn(),
  };

  it('renders props.msg when passed', () => {
    const items = [{
      name: 'Route 1',
      meta: {
        icon: 'mdi-menu',
        name: 'Menu',
        order: 1,
      },
    }];
    const wrapper = shallowMount(MenuComponent, {
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
  it('the method onClick should be called', () => {
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
    const wrapper = shallowMount(MenuComponent, {
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
  });
});
