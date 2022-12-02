<template lang="pug">
VTextField(
  :id="`id-${label}`"
  :label="label"
  :value="value"
  @input="onInput"
  :rules="emailRules"
)
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return {
      emailRules: [
        (value: string) => !this.required || !!value || 'E-mail is required',
        (value: string) => !value.length || regex.test(value) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    onInput(inputValue: string) {
      this.$emit('input', inputValue);
    },
  },
});
</script>
