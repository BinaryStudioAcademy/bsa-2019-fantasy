export type Player = {
  id: string;
  first_name: string;
  second_name: string;
  player_price: number;
  player_score: number;
  position: string;
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
};

export type PlayerFilter = {
  first_name?: string;
  second_name?: string;
  club_id?: string;
};
