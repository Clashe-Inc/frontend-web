import InputEmailVue from '@/components/inputs/InputEmail.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

describe('InputEmail test', () => {
  let wrapper: Wrapper<Vue>;
  const value = '';

  beforeEach(() => {
    wrapper = shallowMount(InputEmailVue, {
      propsData: {
        value,
      },
    });
  });

  it('when value is changed then input should emit an event', () => {
    const inputWrapper = wrapper.getComponent({ name: 'VTextField' });
    inputWrapper.vm.$emit('input', 'email@email.com');

    const emittedInput = wrapper.emitted().input ?? [];
    expect(emittedInput).toBeTruthy();
    expect(emittedInput.length).toBe(1);
    expect(emittedInput[0]).toEqual(['email@email.com']);
  });
  it('when component is rendered then the email rules should be used', () => {
    const input = wrapper.getComponent({ name: 'VTextField' });

    expect(input.props().rules).toEqual([
      wrapper.vm.$data.inputRules.emailValidation,
      wrapper.vm.$data.inputRules.required,
    ]);
  });
  it('when label is not put then the label should be Labe', () => {
    expect(wrapper.props().label).toEqual('Label');
  });
  it('when email is required then the input should validate the required rule', async () => {
    await wrapper.setProps({ required: true });

    expect(wrapper.vm.$data.inputRules.required('')).toBe('Este campo é requerido');
  });
  it('when email is not required then the input should not the validate required', () => {
    expect(wrapper.vm.$data.inputRules.emailValidation('')).toBe(true);
  });
  it('when email is invalid then the input should validate the email', () => {
    expect(wrapper.vm.$data.inputRules.emailValidation('abc')).toBe('E-mail deve ser válido');
  });
});
