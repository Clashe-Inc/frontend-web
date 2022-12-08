import type SummonerResponse from '@/domains/SummonerResponse';
import { reactive } from 'vue';

export const summonerStore = reactive({
  summoner: {} as SummonerResponse,
  remove() {
    this.summoner = {
      code: '',
      email: '',
      level: 0,
      profile_icon_id: 0,
      nickname: '',
    };
  },
});
