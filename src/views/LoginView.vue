<script setup lang="ts">
import InputEmail from '@/components/inputs/InputEmail.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';
import ButtonSuccess from '@/components/buttons/ButtonSuccess.vue';
import type SummonerAuthRequest from '@/domains/SummonerAuthRequest';
import SummonerAuthService from '@/services/SummonerAuthService';
import { snackbarStore } from '@/stores/SnackbarStore';
import backgroundImg from '@/assets/clash-1.jpg';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

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
  SummonerAuthService.authenticate(summonerLogin.value).then(handleSuccess).catch(handleError);
};

const handleSuccess = () => router.push({ name: 'Team' });

const handleClickRegister = () => router.push({ name: 'Summoner Register' });

const handleError = () => snackbarStore.error('Usuário ou senha inválidos');

onMounted(() => {
  SummonerAuthService.removeAuth();
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
                    <ButtonSuccess @click="handleSubmit" label="Login"></ButtonSuccess>
                  </VCol>
                  <VCol cols="12">
                    <VBtn @click="handleClickRegister" block color="info">Cadastre-se</VBtn>
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
