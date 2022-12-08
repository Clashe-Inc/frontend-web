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

const show = ref(false);

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

const handleClickIcon = () => (show.value = !show.value);
</script>

<template>
  <VTextField
    :id="`id-${label}`"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    :label="label"
    :autofocus="autofocus"
    variant="underlined"
    :model-value="modelValue"
    :required="required"
    :rules="[inputRules.required]"
    @click:append="handleClickIcon"
    @update:model-value="handleUpdateModel"
    @keydown.enter.prevent="handleSummit"
    :disabled="loadingStore.loading"
    :loading="loadingStore.loading"
  />
</template>
