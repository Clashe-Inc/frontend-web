<template lang="pug">
VSnackbar(
  v-model="snackbar"
  app
  multi-line
  :color="color"
) {{ message }}
</template>

<script lang="ts">
import EventBusService from '@/services/EventBusService';
import SnackbarMessageService from '@/services/SnackbarMessageService';
import Vue from 'vue';

export default Vue.extend({
  name: 'SnackbarMessage',
  data() {
    return {
      snackbar: false,
      message: '',
      color: '',
    };
  },
  methods: {
    handleSuccess(message: string) {
      this.color = 'success';
      this.message = message;
      this.snackbar = true;
    },
    handleError(message: string) {
      this.color = 'error';
      this.message = message;
      this.snackbar = true;
    },
  },
  created() {
    EventBusService.on(
      SnackbarMessageService.successEventName,
      this.handleSuccess,
    );
    EventBusService.on(
      SnackbarMessageService.errorEventName,
      this.handleError,
    );
  },
  beforeDestroy() {
    EventBusService.off(
      SnackbarMessageService.successEventName,
      this.handleSuccess,
    );
    EventBusService.off(
      SnackbarMessageService.errorEventName,
      this.handleError,
    );
  },
});
</script>
