<script setup lang="ts">
import SideNavigationMenuVue from '@/components/SideNavigationMenu.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = computed(() => {
  return router.getRoutes().filter(({ meta }) => Object.keys(meta).length);
});
</script>

<template>
  <VLayout>
    <SideNavigationMenuVue :items="items" />
    <VMain>
      <VContainer fluid>
        <RouterView />
      </VContainer>
    </VMain>
  </VLayout>
</template>
