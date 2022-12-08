import type SummonerResponse from '@/domains/SummonerResponse';
import { reactive } from 'vue';

export const summonerStore = reactive({
  summoner: {} as SummonerResponse,
});
