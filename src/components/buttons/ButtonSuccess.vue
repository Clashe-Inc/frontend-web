<template lang="pug">
VBtn(
  color="success"
  @click="onClick"
  block
  elevation=2
) {{ label }}
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BtnSuccess',
  props: {
    label: {
      type: String,
      default: 'OK',
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
});
</script>
