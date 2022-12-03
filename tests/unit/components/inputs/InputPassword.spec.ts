import InputPasswordVue from '@/components/inputs/InputPassword.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

describe('InputPassword test', () => {
  let wrapper: Wrapper<Vue>;
  const value = '';

  beforeEach(() => {
    wrapper = shallowMount(InputPasswordVue, {
      propsData: {
        value,
      },
    });
  });

  it('when value is changed then input should emit an event', () => {
    const input = wrapper.getComponent({ name: 'VTextField' });

    input.vm.$emit('input', 'abc123');

    const emittedInput = wrapper.emitted().input ?? [];
    expect(emittedInput).toBeTruthy();
    expect(emittedInput.length).toBe(1);
    expect(emittedInput[0]).toEqual(['abc123']);
  });
  it('when click the show button then password should be visible', () => {
    const input = wrapper.getComponent({ name: 'VTextField' });

    input.vm.$emit('click:append');

    expect(wrapper.vm.$data.show).toBe(true);
  });
  it('when component is rendered then the password rules should be used', () => {
    const input = wrapper.getComponent({ name: 'VTextField' });

    expect(input.props().rules).toEqual([wrapper.vm.$data.inputRules.required]);
  });
  it('when label is not put then the label should be Labe', () => {
    expect(wrapper.props().label).toEqual('Label');
  });
  it('when email is required then the input should validate the required rule', async () => {
    await wrapper.setProps({ required: true });

    expect(wrapper.vm.$data.inputRules.required('')).toBe('Este campo é requerido');
  });
});
