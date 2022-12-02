<template lang="pug">
.d-flex
  VNavigationDrawer(
    v-model="drawer"
    :mini-variant="drawer"
    permanent
    height="100vh"
  )
    SideMenu(id="home-view-menu" :items="items")
  VAppBar(
      app
      color="primary"
      dark
    )
    VAppBarNavIcon(id="home-view-nav-icon" @click="onClick")
    VSpacer
    UserMenu(id="home-view-user-menu")
  VMain
    VContainer(fluid)
      RouterView
</template>

<script lang="ts">
import Vue from 'vue';
import SideMenu from '@/components/SideMenu.vue';
import UserMenu from '@/components/UserMenu.vue';

export default Vue.extend({
  name: 'HomeView',
  components: { SideMenu, UserMenu },
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
