import { shallowMount } from '@vue/test-utils';
import InputEmail from '@Components/inputs/InputEmail.vue';

describe('InputEmail test', () => {
  it('when value is changed then input should emit an event', () => {
    const value = '';
    const wrapper = shallowMount(InputEmail, {
      propsData: {
        value,
      },
    });
    const input = wrapper.find('#id-Label');
    input.vm.$emit('input', 'email@email.com');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input![0][0]).toEqual('email@email.com');
  });
});
