import EventBusService from '@/services/EventBusService';

describe('EventBusService', () => {
  const eventName = 'event-name';

  it('when an event is dispatched then the listener should be executed', () => {
    const func = jest.fn();
    EventBusService.on(eventName, func);

    EventBusService.dispatch(eventName);

    expect(func).toBeCalledTimes(1);
  });
  it('when an event is dispatched and has a parameter then the listener should be executed with the parameter', () => {
    const func = jest.fn();
    const parameter = 'parameter';
    EventBusService.on(eventName, func);

    EventBusService.dispatch(eventName, parameter);

    expect(func).toBeCalledWith(parameter);
  });
  it('when a listener is not listen then the listener should not be executed', () => {
    const func = jest.fn();
    EventBusService.on(eventName, func);
    EventBusService.off(eventName, func);

    EventBusService.dispatch(eventName);

    expect(func).toBeCalledTimes(0);
  });
});
