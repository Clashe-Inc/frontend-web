<script setup lang="ts">
import { snackbarStore } from '@/stores/SnackbarStore';
</script>

<template>
  <VSnackbar v-model="snackbarStore.snackbar" app multi-line :color="snackbarStore.color">
    {{ snackbarStore.message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbarStore.snackbar = false"> Fechar </v-btn>
    </template>
  </VSnackbar>
</template>
