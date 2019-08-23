export enum Position {
  GKP = 'GKP',
  DEF = 'DEF',
  MID = 'MID',
  FWD = 'FWD',
}

export type PlayerType = {
  id: string;
  first_name: string;
  second_name: string;
  player_price: number;
  player_score: number;
  position: Position;
  goals: number;
  assists: number;
  missed_passes: number;
  goals_conceded: number;
  saves: number;
  yellow_cards: number;
  red_cards: number;
  code: number;
  createdAt: string;
  updatedAt: string;
  club_id: number;
  gameweeks_stats?: any;
};

export type PlayerFilter = {
  first_name?: string;
  second_name?: string;
  club_id?: string;
};
