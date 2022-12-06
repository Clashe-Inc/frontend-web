import EventBusService from '@/services/EventBusService';

const successEventName = 'snackbar-success';
const errorEventName = 'snackbar-error';

const success = (message: string) => EventBusService.dispatch(successEventName, message);

const error = (message: string) => EventBusService.dispatch(errorEventName, message);

export default {
  successEventName,
  errorEventName,
  success,
  error,
};
