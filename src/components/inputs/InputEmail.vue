<template lang="pug">
VTextField(
  :id="`id-${label}`"
  :label="label"
  :value="value"
  @input="onInput"
  :rules="[inputRules.emailValidation, inputRules.required]"
)
</template>

<script lang="ts">
import Vue from 'vue';
import InputMixin from './mixins/InputMixin';

export default Vue.extend({
  name: 'InputEmail',
  mixins: [InputMixin],
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
      inputRules: {
        emailValidation: (value: string) => !value.length || regex.test(value) || 'E-mail deve ser válido',
      },
    };
  },
  methods: {
    onInput(inputValue: string) {
      this.$emit('input', inputValue);
    },
  },
});
</script>
