import InputPasswordVue from '@/components/inputs/InputPassword.vue';
import { shallowMount } from '@vue/test-utils';

describe('InputPassword test', () => {
  it('when value is changed then input should emit an event', () => {
    const value = '';
    const wrapper = shallowMount(InputPasswordVue, {
      propsData: {
        value,
        required: false,
      },
    });
    const input = wrapper.getComponent({ name: 'VTextField' });
    input.vm.$emit('input', 'abc123');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input![0][0]).toEqual('abc123');
  });
  it('when click the show button then password should be visible', () => {
    const value = '';
    const wrapper = shallowMount(InputPasswordVue, {
      propsData: {
        value,
        required: false,
      },
    });
    const input = wrapper.getComponent({ name: 'VTextField' });
    input.vm.$emit('click:append');
    expect(wrapper.vm.$data.show).toBe(true);
  });
  it('when component is rendered then the password rules should be used', () => {
    const value = '';
    const wrapper = shallowMount(InputPasswordVue, {
      propsData: {
        value,
        required: false,
      },
    });
    const input = wrapper.getComponent({ name: 'VTextField' });
    expect(input.props().rules).toEqual([wrapper.vm.$data.inputRules.required]);
  });
  it('when label is not put then the label should be Labe', () => {
    const value = '';
    const wrapper = shallowMount(InputPasswordVue, {
      propsData: {
        value,
        required: false,
      },
    });
    expect(wrapper.props().label).toEqual('Label');
  });
  it('when email is required then the input should validate the required rule', () => {
    const value = '';
    const wrapper = shallowMount(InputPasswordVue, {
      propsData: {
        value,
        required: true,
      },
    });
    expect(wrapper.vm.$data.inputRules.required('')).toBe('This field is required');
  });
});
