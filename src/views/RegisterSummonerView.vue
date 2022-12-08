<script setup lang="ts">
import logoImg from '@/assets/clash-2.jpg';
import ButtonSuccess from '@/components/buttons/SuccessButton.vue';
import ButtonText from '@/components/buttons/TextButton.vue';
import InputEmail from '@/components/inputs/InputEmail.vue';
import InputNickname from '@/components/inputs/InputNickname.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';
import type NewSummonerRequest from '@/domains/NewSummonerRequest';
import SummonerService from '@/services/SummonerService';
import { loadingStore } from '@/stores/LoadingStore';
import { snackbarStore } from '@/stores/SnackbarStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const summoner = ref<NewSummonerRequest>({
  email: '',
  password: '',
  confirm_password: '',
  nickname: '',
});

const registerForm = ref<HTMLFormElement | null>(null);
const router = useRouter();

const handleClickRegister = async () => {
  if (!registerForm.value) return;
  const { valid } = await registerForm.value.validate();
  if (!valid) return;
  loadingStore.setLoading(true);
  try {
    await SummonerService.register(summoner.value);
    snackbarStore.success('Registro realizado com sucesso');
    registerForm.value.reset();
  } catch (error) {
    snackbarStore.error((error as Error).message);
  } finally {
    loadingStore.setLoading(false);
  }
};
const handleClickBack = () => {
  router.push({
    name: 'Login',
  });
};
</script>

<template>
  <div class="d-flex justify-center">
    <VCard class="mt-5" max-width="70vh" width="50vh">
      <VImg :src="logoImg" cover height="30vh" />
      <VCardTitle class="text-h5">Registre-se para usar o Clashe</VCardTitle>
      <VCardText>
        <VForm ref="registerForm">
          <VRow>
            <VCol cols="12">
              <InputEmail v-model="summoner.email" label="Email" required></InputEmail>
            </VCol>
            <VCol cols="12">
              <InputPassword v-model="summoner.password" label="Password" required></InputPassword>
            </VCol>
            <VCol cols="12">
              <InputPassword
                v-model="summoner.confirm_password"
                label="Confirm password"
                required
              ></InputPassword>
            </VCol>
            <VCol cols="12">
              <InputNickname v-model="summoner.nickname" label="Nickname" required></InputNickname>
            </VCol>
            <VCol cols="12">
              <ButtonSuccess label="Cadastrar agora" @click="handleClickRegister" />
              <ButtonText class="mt-2" label="Voltar" @click="handleClickBack" />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
