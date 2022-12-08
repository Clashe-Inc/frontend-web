<script setup lang="ts">
import { loadingStore } from '@/stores/LoadingStore';

defineProps({
  label: {
    type: String,
    default: 'OK',
  },
  id: {
    type: String,
    default: 'btn-success',
  },
});
</script>

<template>
  <VBtn
    :id="id"
    color="success"
    block
    elevation="2"
    :loading="loadingStore.loading"
    :disabled="loadingStore.loading"
  >
    {{ label }}
  </VBtn>
</template>
