<template lang="pug">
v-text-field(
  :id="`id-${label}`"
  :label="label"
  :value="value"
  @input="onInput"
)
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputEmail',
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    onInput(inputValue: string) {
      this.$emit('input', inputValue);
    },
  },
});
</script>
