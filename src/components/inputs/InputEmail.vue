<script setup lang="ts">
import { ref } from 'vue';

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
    default: 'Label',
  },
});

const inputRules = ref({
  required: (value: string) => !props.required || !!value || 'Este campo é requerido',
});
const emailRules = ref({
  validate: (value: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail deve ser válido',
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
    variant="underlined"
    :label="label"
    :required="required"
    :autofocus="autofocus"
    :model-value="modelValue"
    @update:model-value="handleUpdateModel"
    :rules="[inputRules.required, emailRules.validate]"
    @keydown.enter.prevent="handleSummit"
  />
</template>
