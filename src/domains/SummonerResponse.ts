import type SummonerRoleResponse from './SummonerRoleResponse';

interface SummonerResponse {
  email: string;
  nickname: string;
  code: string;
  level: number;
  profile_icon_id: number;
  role?: SummonerRoleResponse;
}

export default SummonerResponse;
