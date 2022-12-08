<script setup lang="ts">
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
  <VBtn :id="id" color="success" block elevation="2">
    {{ label }}
  </VBtn>
</template>
