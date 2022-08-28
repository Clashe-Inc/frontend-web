<template lang="pug">
v-list
  v-list-item.mt-2
  v-list-item-group(
    :value="selectedItem"
    color="primary"
  )
    v-list-item(
      v-for="(item, index) in items"
      :key="index"
      @click="onClick(item)"
      :id="'menu-' + item.meta.order"
    )
      v-list-item-icon
        v-icon {{ item.meta.icon }}
      v-list-item-content
        v-list-item-title {{ item.meta.name }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteRecordPublic } from 'vue-router';

export default defineComponent({
  name: 'MenuComponent',
  props: {
    items: {
      required: true,
      type: Array as () => RouteRecordPublic[],
    },
  },
  computed: {
    selectedItem(): number {
      return this.items.findIndex((item) => item.name === this.$route.name);
    },
  },
  methods: {
    onClick(route: RouteRecordPublic) {
      if (this.$route.name === route.name) return;
      this.$router.push({
        name: route.name,
      });
    },
  },
});
</script>
