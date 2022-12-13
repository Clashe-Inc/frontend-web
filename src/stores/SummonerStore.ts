import type SummonerResponse from '@/domains/SummonerResponse';
import type SummonerRoleResponse from '@/domains/SummonerRoleResponse';
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
  updateRole(role: SummonerRoleResponse) {
    this.summoner.role = role;
  },
});
