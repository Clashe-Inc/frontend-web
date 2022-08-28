<template lang="pug">
.d-flex.align-center
  .text-subtitle-1.mr-3 John
  v-menu(
    id="user-menu-list"
    bottom
    transition="slide-y-transition"
    rounded
    offset-y
  )
    template(v-slot:activator="{ on }")
      v-btn(
        id="user-menu-btn-avatar"
        icon
        x-large
        v-on="on"
      )
        v-avatar
          img(
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          )
    v-card
      v-list-item-content.justify-center
        v-list-item
          v-btn(
            id="user-menu-btn-exit"
            depressed
            rounded
            text
            @click="onClick"
          ) Sair
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    onClick() {
      this.$router.push({
        name: 'Login',
      });
    },
  },
});
</script>
