<template lang="pug">
VApp
  SnackbarMessage
  VExpandXTransition
    RouterView
</template>

<script lang="ts">
import Vue from 'vue';
import SnackbarMessage from '@/components/SnackbarMessage.vue';

export default Vue.extend({
  name: 'App',
  components: {
    SnackbarMessage,
  },
});
</script>
