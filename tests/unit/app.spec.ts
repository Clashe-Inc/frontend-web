import AppView from '@/App.vue';
import { shallowMount } from '@vue/test-utils';

describe('AppView', () => {
  it('when the AppView is rendered then it should exists', () => {
    const wrapper = shallowMount(AppView, {
      stubs: ['RouterView'],
    });

    expect(wrapper.exists()).toBe(true);
  });
});
