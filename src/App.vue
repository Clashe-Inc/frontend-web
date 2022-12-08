<script setup lang="ts">
import { RouterView } from 'vue-router';
import SnackbarMessage from '@/components/SnackbarMessage.vue';
</script>

<template>
  <VApp>
    <SnackbarMessage />
    <RouterView v-slot="{ Component }">
      <VExpandTransition>
        <component :is="Component" />
      </VExpandTransition>
    </RouterView>
  </VApp>
</template>
