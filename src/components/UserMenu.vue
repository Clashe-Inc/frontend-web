<template lang="pug">
.d-flex.align-center
  .text-subtitle-1.mr-3 John
  VMenu(
    id="user-menu-list"
    bottom
    transition="slide-y-transition"
    rounded
    offset-y
  )
    template(v-slot:activator="{ on }")
      VBtn(
        id="user-menu-btn-avatar"
        icon
        x-large
        v-on="on"
      )
        VAvatar
          img(
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          )
    VCard
      VListItemContent.justify-center
        VListItem
          v-btn(
            id="user-menu-btn-exit"
            depressed
            rounded
            text
            @click="onClick"
          ) Sair
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    onClick() {
      this.$router.push({
        name: 'Login',
      });
    },
  },
});
</script>
