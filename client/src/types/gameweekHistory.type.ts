import { Player } from './player.types';

export type GameweekHistoryType = TeamMemberType & PlayerStatsType;

export type TeamMemberType = {
  is_on_bench: boolean;
  is_captain: boolean;
  player_id: string;
};

export type PlayerStatsType = {
  player_stats: Player;
};

export type GameweekHistoryResultsType = {
  id: string;
  user_id: string;
  gameweek_id: string;
  team_score: number;
  createdAt: string;
  updatedAt: string;
};
