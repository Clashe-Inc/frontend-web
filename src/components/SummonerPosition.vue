<script setup lang="ts">
import type SummonerPositionData from '@/domains/SummonerPositionData';
import { summonerStore } from '@/stores/SummonerStore';
import { computed, defineProps, ref, watch } from 'vue';

export interface SummonerPositionProps {
  position: SummonerPositionData;
}

const props = defineProps<SummonerPositionProps>();

const summonerRoleName = ref<string>();

const summonerAvatarUrl = computed(() => {
  if (!summonerStore.summoner.profile_icon_id) return '';
  return `http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${summonerStore.summoner.profile_icon_id}.png`;
});

const getSummonerPositionOrDefault = () => {
  const { position } = props;
  if (!summonerAvatarUrl.value) return position.img;
  return summonerRoleName.value === position.name ? summonerAvatarUrl.value : position.img;
};

watch(
  () => summonerStore.summoner.role,
  (value) => {
    if (value) summonerRoleName.value = value.name;
  }
);
</script>
<template>
  <VMenu :close-on-content-click="false" location="top" rounded>
    <template v-slot:activator="{ props }">
      <VBtn v-bind="props" variant="plain" icon size="x-large">
        <VAvatar :image="getSummonerPositionOrDefault()" size="75" />
      </VBtn>
    </template>
    <VCard
      width="200"
      :title="summonerStore.summoner.nickname"
      :subtitle="summonerRoleName?.toUpperCase()"
    >
      <VCardText>
        <div class="d-flex flex-column">
          <span class="text-body-2">Mains</span>
          <span class="text-body-2">Winrate: <span class="font-weight-bold">100%</span></span>
        </div>
      </VCardText>
      <div class="d-flex justify-end">
        <VBtn color="error" icon="mdi-delete" size="small" variant="text" />
      </div>
    </VCard>
  </VMenu>
</template>
