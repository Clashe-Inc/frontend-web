<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  items: {
    required: true,
    type: Array as () => RouteRecordRaw[],
  },
});

const drawer = ref(true);
const rail = ref(false);

const selectedItem = computed(() => {
  return props.items.findIndex(({ name }) => name === route.name?.toString());
});

const handleExpandingDrawer = () => (rail.value = !rail.value);

const handleChangingRoute = (item: RouteRecordRaw) => {
  if (route.name === item.name) return;
  const { name } = item;
  router.push({
    name,
  });
};

const handleExitAppIcon = () => router.push({ name: 'Login' });
</script>

<template>
  <VNavigationDrawer
    class="side-navigation_drawer"
    v-model="drawer"
    permanent
    :rail="rail"
    height="100%"
  >
    <VListItem
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
      @click="handleExpandingDrawer"
    >
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="handleExpandingDrawer"></v-btn>
      </template>
    </VListItem>
    <VDivider />
    <VList class="side-navigation_drawer_menu" nav>
      <VTooltip v-for="(item, index) in items" :key="index" :text="(item.meta?.name as string)">
        <template v-slot:activator="{ props }">
          <VListItem
            v-bind="props"
            active-color="primary"
            @click="() => handleChangingRoute(item)"
            :id="`menu-${item.meta?.order}`"
            :prepend-icon="(item.meta?.icon as string)"
            :title="(item.meta?.name as string)"
            :value="(item.meta?.name as string)"
            :active="selectedItem === index"
          />
        </template>
      </VTooltip>
      <VDivider />
      <VTooltip text="Sair">
        <template v-slot:activator="{ props }">
          <VListItem
            v-bind="props"
            id="menu-login"
            prepend-icon="mdi-exit-to-app"
            title="Sair"
            @click="handleExitAppIcon"
          />
        </template>
      </VTooltip>
    </VList>
  </VNavigationDrawer>
</template>
