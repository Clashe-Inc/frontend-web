<template lang="pug">
v-container
  v-col
    .text-h3.text-center LOGIN
  v-col
    v-form
      v-text-field
      v-text-field
      v-text-field
      v-btn(@click="onClick") Salvar
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginView',
  methods: {
    onClick() {
      this.$router.push({ name: 'Team' });
    },
  },
});
</script>
