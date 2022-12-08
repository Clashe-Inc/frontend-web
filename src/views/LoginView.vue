<script setup lang="ts">
import InputEmail from '@/components/inputs/InputEmail.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';
import SuccessButton from '@/components/buttons/SuccessButton.vue';
import RegisterButton from '@/components/buttons/RegisterButton.vue';
import type SummonerAuthRequest from '@/domains/SummonerAuthRequest';
import SummonerAuthService from '@/services/SummonerAuthService';
import { snackbarStore } from '@/stores/SnackbarStore';
import backgroundImg from '@/assets/clash-1.jpg';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { loadingStore } from '@/stores/LoadingStore';
import { authStore } from '@/stores/AuthStore';

const router = useRouter();

const summonerLogin = ref<SummonerAuthRequest>({
  password: '',
  username: '',
});
const loginForm = ref<HTMLFormElement | null>(null);

const handleSubmit = async () => {
  if (!loginForm.value) return;
  const { valid } = await loginForm.value.validate();
  if (!valid) return;
  loadingStore.setLoading(true);
  try {
    const authResponse = await SummonerAuthService.authenticate(summonerLogin.value);
    authStore.setAuthentication(authResponse);
    handleSuccess();
  } catch {
    handleError();
  } finally {
    loadingStore.setLoading(false);
  }
};

const handleSuccess = () => router.push({ name: 'Team' });

const handleClickRegister = () => router.push({ name: 'Summoner Register' });

const handleError = () => snackbarStore.error('Usuário ou senha inválidos');

onMounted(() => {
  authStore.removeAuth();
});
</script>

<template>
  <div class="login-view d-flex flex-column">
    <VImg :src="backgroundImg" cover height="50vh" />
    <VContainer class="login-view_content">
      <VRow justify="center">
        <VCol cols="4">
          <VCard elevation="4" rounded="rounded">
            <div class="display-1 font-weight-light text-center pt-5">Bem vindo ao Clashe</div>
            <VCardText>
              <VForm ref="loginForm" lazy-validation>
                <VRow>
                  <VCol cols="12">
                    <InputEmail
                      v-model="summonerLogin.username"
                      label="Email"
                      required
                      @submit="handleSubmit"
                      autofocus
                    />
                  </VCol>
                  <VCol cols="12">
                    <InputPassword
                      v-model="summonerLogin.password"
                      label="Senha"
                      required
                      @submit="handleSubmit"
                    />
                  </VCol>
                  <VCol cols="12">
                    <SuccessButton @click="handleSubmit" label="Login"></SuccessButton>
                  </VCol>
                  <VCol cols="12">
                    <RegisterButton @click="handleClickRegister" label="Cadastre-se" />
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style scoped>
.login-view_content {
  margin-top: -8%;
}
</style>
