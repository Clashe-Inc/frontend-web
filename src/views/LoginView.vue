<template lang="pug">
VContainer
  VCol
    .text-h3.text-center LOGIN
  VCol
    VForm
      InputEmail(v-model="user.email" label="Email" required)
      VTextField
      VTextField
      VBtn(@click="onClick") Salvar
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
