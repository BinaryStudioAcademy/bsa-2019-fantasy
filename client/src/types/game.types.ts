export type Game = {
  id: string;
  start: string;
  started: boolean;
  finished: boolean;
  minutes: number;
  hometeam_score: number;
  awayteam_score: number;
  gameweek_id: number;
  hometeam_id: number;
  awayteam_id: number;
  createdAt: string;
  updatedAt: string;
};
export type CurrentGame = {
  current: Game;
  next: Game;
};
