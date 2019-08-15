export type History = {
  gameweek: {
    number: number;
  };
  game: {
    opp: string;
    res: string;
  };
  stats: {
    goals: number;
    assists: number;
    missed_passes: number;
    goals_conceded: number;
    saves: number;
    yellow_cards: number;
    red_cards: number;
  };
};
