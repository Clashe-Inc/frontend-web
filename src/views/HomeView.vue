<script setup lang="ts">
import SideNavigationMenuVue from '@/components/SideNavigationMenu.vue';
import SummonerService from '@/services/SummonerService';
import { authStore } from '@/stores/AuthStore';
import { loadingStore } from '@/stores/LoadingStore';
import { summonerStore } from '@/stores/SummonerStore';
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = computed(() => {
  return router.getRoutes().filter(({ meta }) => Object.keys(meta).length);
});

onMounted(async () => {
  loadingStore.setLoading(true);
  try {
    const data = await SummonerService.get();
    summonerStore.summoner = data;
  } finally {
    loadingStore.setLoading(false);
  }
});

watch(
  () => authStore.isAuthenticated,
  (isAuthenticated) => {
    if (!isAuthenticated) {
      summonerStore.remove();
      router.push({ name: 'Login' });
    }
  }
);
</script>

<template>
  <VLayout>
    <SideNavigationMenuVue :items="items" />
    <VMain>
      <VOverlay :model-value="loadingStore.loading" />
      <VContainer fluid>
        <RouterView />
      </VContainer>
    </VMain>
  </VLayout>
</template>
