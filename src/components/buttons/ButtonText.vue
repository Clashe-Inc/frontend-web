<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'OK',
  },
});
</script>

<template>
  <VBtn color="info" block elevation="2" text>
    {{ label }}
  </VBtn>
</template>
