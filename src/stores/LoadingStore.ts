import { reactive } from 'vue';

export const loadingStore = reactive({
  loading: false,

  setLoading(loading: boolean) {
    this.loading = loading;
  },
});
