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
                  InputEmail(v-model="user.username" label="Email" required)
                VCol(cols=12)
                  InputPassword(v-model="user.password" label="Password" required)
                VCol(cols=12)
                  ButtonSuccess(@click="onClick" label="Login")
</template>

<script lang="ts">
import Vue from 'vue';
import InputEmail from '@/components/inputs/InputEmail.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';
import ButtonSuccess from '@/components/buttons/ButtonSuccess.vue';
import SummonerLogin from '@/domains/SummonerLogin';

interface FormValidation extends Vue {
  validate(): boolean
}

export default Vue.extend({
  name: 'LoginView',
  components: {
    InputEmail,
    InputPassword,
    ButtonSuccess,
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
      const form = this.$refs.loginForm as FormValidation;
      if (form.validate()) {
        this.$router.push({ name: 'Team' });
      }
    },
  },
});
</script>

<style scoped>
.login-view_content {
  margin-top: -8%;
}
</style>
