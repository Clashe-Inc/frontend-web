<script setup lang="ts">
import riftMapImg from '@/assets/rift-map.webp';

import SummonerPosition from '@/components/SummonerPosition.vue';
import SummonerService from '@/services/SummonerService';
import { loadingStore } from '@/stores/LoadingStore';
import { summonerStore } from '@/stores/SummonerStore';
import positionTopImg from '@/assets/position-top.png';
import positionJungleImg from '@/assets/position-jungle.png';
import positionMidImg from '@/assets/position-mid.png';
import positionBotImg from '@/assets/position-bot.png';
import positionSupportImg from '@/assets/position-support.png';
import { onMounted, ref } from 'vue';
import type SummonerPositionData from '@/domains/SummonerPositionData';

const positions = ref<SummonerPositionData[]>([
  { name: 'top', img: positionTopImg },
  { name: 'jungle', img: positionJungleImg },
  { name: 'mid', img: positionMidImg },
  { name: 'support', img: positionSupportImg },
  { name: 'bot', img: positionBotImg },
]);

onMounted(async () => {
  loadingStore.setLoading(true);
  try {
    const data = await SummonerService.getPositionBySummonerCode('abc');
    summonerStore.summoner.role = data;
  } catch (error) {
    console.error({ error });
  } finally {
    loadingStore.setLoading(false);
  }
});
</script>

<template>
  <div class="team-view">
    <VImg :src="riftMapImg" cover />
    <div class="team-view_positions">
      <div class="team-view_positions_imgs">
        <div
          :class="`team-view_positions-imgs__${position.name}`"
          v-for="position in positions"
          :key="position.name"
        >
          <SummonerPosition :position="position" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-view {
  position: relative;
}
.team-view_positions {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 10vh;
}
.team-view_positions_imgs {
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 10vh;
  gap: 10vh;
}
.team-view_positions-imgs__top {
  margin-left: -100vh;
}
.team-view_positions-imgs__jungle {
  margin-top: 8vh;
  margin-left: -70vh;
}
.team-view_positions-imgs__mid {
  margin-top: -8vh;
  margin-left: -10vh;
}
.team-view_positions-imgs__support {
  margin-top: 26vh;
  margin-left: 60vh;
}
.team-view_positions-imgs__bot {
  margin-top: -17vh;
  margin-left: 80vh;
}
</style>
