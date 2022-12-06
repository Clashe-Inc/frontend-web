import SnackbarMessageService from '@/services/SnackbarMessageService';
import EventBusService from '@/services/EventBusService';

jest.mock('@/services/EventBusService');

const eventBusServiceMock = jest.mocked(EventBusService);

describe('SnackbarMessageService', () => {
  const message = 'event-name';
  beforeEach(() => {
    eventBusServiceMock.dispatch.mockClear();
  });

  it('when the success method is called then an success event should be dispatched', () => {
    SnackbarMessageService.success(message);

    expect(eventBusServiceMock.dispatch).toBeCalledTimes(1);
    expect(eventBusServiceMock.dispatch).toBeCalledWith(
      SnackbarMessageService.successEventName,
      message,
    );
  });
  it('when the error method is called then an error event should be dispatched', () => {
    SnackbarMessageService.error(message);

    expect(eventBusServiceMock.dispatch).toBeCalledTimes(1);
    expect(eventBusServiceMock.dispatch).toBeCalledWith(
      SnackbarMessageService.errorEventName,
      message,
    );
  });
});
