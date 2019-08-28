import { Club } from './club.type';

export type FixturesItemType = {
  id: string;
  start: string;
  end: string;
  started: boolean;
  hometeam_score: number;
  awayteam_score: number;
  createdAt: string;
  updatedAt: string;
  hometeam_id: number;
  awaytema_id: number;
  hometeam: Club;
  awayteam: Club;
};

export type FixturesType = {
  games: FixturesItemType[];
};

export type GameDetailsType = {
  id: string;
  event_type: string;
  createdAt: string;
  updatedAt: string;
  player_match_stat_id: string;
  player: any;
};

export type GamesDetailsType = {
  gamesDetails: GameDetailsType[];
};
