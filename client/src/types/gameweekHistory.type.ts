import { PlayerType } from './player.types';

export type GameweekHistoryType = TeamMemberType & PlayerStatsType;

export type TeamMemberType = {
  is_on_bench: boolean;
  is_captain: boolean;
  is_vice_captain: boolean;
  player_id: string;
};

export type PlayerStatsType = {
  player_stats: PlayerType;
};

export type GameweekHistoryResultsType = {
  gameweek: string;
  average: number;
  max: number;
};

export type GameweekUserRankingType = {
  rank: number;
};
