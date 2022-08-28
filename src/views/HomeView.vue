<template lang="pug">
.d-flex
  v-navigation-drawer(
    v-model="drawer"
    :mini-variant="drawer"
    permanent
    height="100vh"
  )
    Menu(:items="items")
  v-app-bar(
      app
      color="primary"
      dark
    )
    v-app-bar-nav-icon(@click="onClick")
    v-spacer
    UserMenu
  v-main
    v-container(fluid)
      router-view
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from '@/components/Menu.vue';
import UserMenu from '@/components/UserMenu.vue';

export default Vue.extend({
  name: 'HomeView',
  components: { Menu, UserMenu },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    items() {
      return this.$router
        .getRoutes()
        .filter((route) => Object.keys(route.meta).length);
    },
  },
  methods: {
    onClick() {
      this.drawer = !this.drawer;
    },
  },
});
</script>
