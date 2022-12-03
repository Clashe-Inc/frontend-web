import ButtonSuccessVue from '@/components/buttons/ButtonSuccess.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

describe('ButtonSuccess test', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(ButtonSuccessVue);
  });

  it('when the button is pressed then an click event should be emitted', () => {
    const button = wrapper.getComponent({ name: 'VBtn' });
    button.vm.$emit('click');
    const emittedClick = wrapper.emitted().click ?? [];
    expect(emittedClick).toBeTruthy();
    expect(emittedClick.length).toBe(1);
  });
  it('when label is not put then the label should be Ok', () => {
    expect(wrapper.props().label).toEqual('OK');
  });
});
