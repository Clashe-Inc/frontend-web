<template lang="pug">
VTextField(
  :id="`id-${label}`"
  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
  :type="show ? 'text' : 'password'"
  :label="label"
  :value="value"
  :rules="[inputRules.required]"
  @click:append="onClick"
  @input="onInput"
)
</template>

<script lang="ts">
import Vue from 'vue';
import InputMixin from './mixins/InputMixin';

export default Vue.extend({
  name: 'InputEmail',
  mixins: [InputMixin],
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onInput(inputValue: string) {
      this.$emit('input', inputValue);
    },
    onClick() {
      this.show = !this.show;
    },
  },
});
</script>
