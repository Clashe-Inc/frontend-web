<template lang="pug">
v-container
  v-col
    .text-h3.text-center LOGIN
  v-col
    v-form
      input-email(v-model="user.email" label="Email")
      v-text-field
      v-text-field
      v-btn(@click="onClick") Salvar
</template>

<script lang="ts">
import Vue from 'vue';
import InputEmail from '@/components/inputs/InputEmail.vue';

export default Vue.extend({
  name: 'LoginView',
  components: {
    InputEmail,
  },
  data() {
    return {
      user: {
        email: '',
      },
    };
  },
  methods: {
    onClick() {
      this.$router.push({ name: 'Team' });
    },
  },
});
</script>
