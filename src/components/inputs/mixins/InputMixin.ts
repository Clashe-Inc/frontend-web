import Vue from 'vue';

export default Vue.mixin({
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputRules: {
        required: (value: string) => !this.$props.required || !!value || 'This field is required',
      },
    };
  },
});
