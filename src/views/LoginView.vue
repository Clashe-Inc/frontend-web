<template lang="pug">
VContainer
  VCol
    .text-h3.text-center LOGIN
  VCol
    VForm
      InputEmail(v-model="user.username" label="Email")
      InputPassword(v-model="user.password" label="Password")
      VBtn(@click="onClick") Salvar
</template>

<script lang="ts">
import Vue from 'vue';
import InputEmail from '@/components/inputs/InputEmail.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';
import SummonerLogin from '@/domains/SummonerLogin';

export default Vue.extend({
  name: 'LoginView',
  components: {
    InputEmail,
    InputPassword,
  },
  data(): { user: SummonerLogin } {
    return {
      user: {
        username: '',
        password: '',
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
