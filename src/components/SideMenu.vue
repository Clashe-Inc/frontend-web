<template lang="pug">
VList
  VListItem.mt-2
  VListItemGroup(
    :value="selectedItem"
    color="primary"
  )
    VListItem(
      v-for="(item, index) in items"
      :key="index"
      @click="onClick(item)"
      :id="'menu-' + item.meta.order"
    )
      VListItemIcon
        VIcon {{ item.meta.icon }}
      VListItemContent
        VListItemTitle {{ item.meta.name }}
</template>

<script lang="ts">
import Vue from 'vue';
import { RouteRecordPublic } from 'vue-router';

export default Vue.extend({
  name: 'SideMenu',
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
