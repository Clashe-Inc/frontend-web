<script setup lang="ts">
import { loadingStore } from '@/stores/LoadingStore';

defineProps({
  label: {
    type: String,
    default: 'OK',
  },
  id: {
    type: String,
    default: 'btn-text',
  },
});
</script>

<template>
  <VBtn
    color="info"
    block
    elevation="2"
    text
    :loading="loadingStore.loading"
    :disabled="loadingStore.loading"
  >
    {{ label }}
  </VBtn>
</template>
