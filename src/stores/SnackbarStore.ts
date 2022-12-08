import { reactive } from 'vue';

export const snackbarStore = reactive({
  message: '',
  snackbar: false,
  color: '',

  show(message: string, snackbar: boolean, color: string) {
    this.message = message;
    this.snackbar = snackbar;
    this.color = color;
  },

  success(message: string) {
    this.show(message, true, 'success');
  },
  error(message: string) {
    this.show(message, true, 'error');
  },
});
