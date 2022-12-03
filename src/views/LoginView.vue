<template lang="pug">
.login-view
  VImg(:src="require('@/assets/clash-1.jpg')" height="50vh")
  VContainer.login-view_content
    VRow(justify="center")
      VCol(cols=4)
        VCard(elevation=4 rounded)
          .display-1.font-weight-light.text-center.pt-5 Bem vindo ao Clashe
          VCardText
            VForm(ref="loginForm" lazy-validation)
              VRow
                VCol(cols=12)
                  InputEmail(v-model="summonerLogin.username" label="Email" required)
                VCol(cols=12)
                  InputPassword(v-model="summonerLogin.password" label="Senha" required)
                VCol(cols=12)
                  ButtonSuccess(@click="onClickLogin" label="Login")
                VCol(cols=12)
                  VBtn(@click="onClickSummonerRegister" block color="info") Cadastre-se
</template>

<script lang="ts">
import Vue from 'vue';
import InputEmail from '@/components/inputs/InputEmail.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';
import ButtonSuccess from '@/components/buttons/ButtonSuccess.vue';
import FormValidation from '@/domains/FormValidation';
import AuthService from '@/services/AuthService';
import AuthRequest from '@/domains/AuthRequest';

export default Vue.extend({
  name: 'LoginView',
  components: {
    InputEmail,
    InputPassword,
    ButtonSuccess,
  },
  data(): { summonerLogin: AuthRequest } {
    return {
      summonerLogin: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    refLoginForm() {
      return this.$refs.loginForm as FormValidation;
    },
  },
  methods: {
    async onClickLogin() {
      if (this.refLoginForm.validate()) {
        try {
          const summonerLoggedIn = await AuthService.authenticate(this.summonerLogin);
          AuthService.handle(summonerLoggedIn);
          this.$router.push({ name: 'Team' });
        } catch (error) {
          console.error({ error });
        }
      }
    },
    onClickSummonerRegister() {
      console.log('Cadastre-se');
    },
  },
});
</script>

<style scoped>
.login-view_content {
  margin-top: -8%;
}
</style>
