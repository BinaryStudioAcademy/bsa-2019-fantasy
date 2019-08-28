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

export type FixtureSubType = {
  start: string;
  end: string;
  finished: boolean;
  homeTeamScore?: number;
  awayTeamScore?: number;
  homeTeamName?: string;
  awayTeamName?: string;
  isFavClub?: boolean;
};

export type FixturesType = {
  games: FixturesItemType[];
};
