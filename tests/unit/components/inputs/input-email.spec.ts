import InputEmailVue from '@/components/inputs/InputEmail.vue';
import { shallowMount } from '@vue/test-utils';

describe('InputEmail test', () => {
  it('when value is changed then input should emit an event', () => {
    const value = '';
    const wrapper = shallowMount(InputEmailVue, {
      propsData: {
        value,
        required: false,
      },
    });
    const input = wrapper.getComponent({ name: 'VTextField' });
    input.vm.$emit('input', 'email@email.com');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input![0][0]).toEqual('email@email.com');
  });
  it('when component is rendered then the email rules should be used', () => {
    const value = '';
    const wrapper = shallowMount(InputEmailVue, {
      propsData: {
        value,
        required: false,
      },
    });
    const input = wrapper.getComponent({ name: 'VTextField' });
    expect(input.props().rules).toEqual([
      wrapper.vm.$data.inputRules.emailValidation,
      wrapper.vm.$data.inputRules.required,
    ]);
  });
  it('when label is not put then the label should be Labe', () => {
    const value = '';
    const wrapper = shallowMount(InputEmailVue, {
      propsData: {
        value,
        required: false,
      },
    });
    expect(wrapper.props().label).toEqual('Label');
  });
  it('when email is required then the input should validate the required rule', () => {
    const value = '';
    const wrapper = shallowMount(InputEmailVue, {
      propsData: {
        value,
        required: true,
      },
    });
    expect(wrapper.vm.$data.inputRules.required('')).toBe('This field is required');
  });
  it('when email is not required then the input should not the validate required', () => {
    const value = '';
    const wrapper = shallowMount(InputEmailVue, {
      propsData: {
        value,
        required: false,
      },
    });
    expect(wrapper.vm.$data.inputRules.emailValidation('')).toBe(true);
  });
  it('when email is invalid then the input should validate the email', () => {
    const value = '';
    const wrapper = shallowMount(InputEmailVue, {
      propsData: {
        value,
        required: false,
      },
    });
    expect(wrapper.vm.$data.inputRules.emailValidation('abc')).toBe('E-mail must be valid');
  });
});
