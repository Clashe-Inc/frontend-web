import SnackbarMessageVue from '@/components/SnackbarMessage.vue';
import EventBusService from '@/services/EventBusService';
import SnackbarMessageService from '@/services/SnackbarMessageService';
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

jest.mock('@/services/EventBusService');
const eventBusServiceMock = jest.mocked(EventBusService);

describe('SnackbarMessage', () => {
  let wrapper: any;

  const vuetify = new Vuetify();

  beforeEach(() => {
    wrapper = mount(SnackbarMessageVue, {
      vuetify,
    });
  });

  it('when SnackbarMessage is rendered then the events should be registered', () => {
    const { calls } = eventBusServiceMock.on.mock;

    expect(wrapper.vm.$data.snackbar).toBeFalsy();
    expect(eventBusServiceMock.on).toBeCalledTimes(2);
    expect(calls).toHaveLength(2);
    expect(calls[0]).toEqual([SnackbarMessageService.successEventName, wrapper.vm.handleSuccess]);
    expect(calls[1]).toEqual([SnackbarMessageService.errorEventName, wrapper.vm.handleError]);
  });
  it('snackbar should show a text message', async () => {
    await wrapper.setData({ snackbar: true, message: 'text message', color: 'primary' });
    const snackbar = wrapper.findComponent({ name: 'v-snackbar' });

    expect(snackbar.text()).toEqual('text message');
  });
  it('when the handle success method is called then snackbar should show snackbar success', () => {
    wrapper.vm.handleSuccess('success');

    expect(wrapper.vm.$data.snackbar).toBeTruthy();
    expect(wrapper.vm.$data.message).toEqual('success');
    expect(wrapper.vm.$data.color).toEqual('success');
  });
  it('when the handle error method is called then snackbar should show snackbar error', () => {
    wrapper.vm.handleError('error');

    expect(wrapper.vm.$data.snackbar).toBeTruthy();
    expect(wrapper.vm.$data.message).toEqual('error');
    expect(wrapper.vm.$data.color).toEqual('error');
  });
});
