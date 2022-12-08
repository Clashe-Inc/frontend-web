<script setup lang="ts">
import { ref } from 'vue';
import { loadingStore } from '@/stores/LoadingStore';

const props = defineProps({
  label: {
    type: String,
    default: 'Label',
  },
  required: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const inputRules = ref({
  required: (value: string) => !props.required || !!value || 'Este campo é requerido',
});

const emit = defineEmits(['update:model-value', 'submit']);

const handleUpdateModel = (inputValue: any) => {
  emit('update:model-value', inputValue);
};

const handleSummit = () => {
  emit('submit');
};
</script>
<template>
  <VTextField
    :id="`id-${label}`"
    :label="label"
    variant="underlined"
    :autofocus="autofocus"
    :value="modelValue"
    :rules="[inputRules.required]"
    @update:modelValue="handleUpdateModel"
    @keydown.enter.prevent="handleSummit"
    :disabled="loadingStore.loading"
    :loading="loadingStore.loading"
  />
</template>
