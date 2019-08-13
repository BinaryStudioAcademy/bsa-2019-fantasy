export type FixturesItemType = {
  id: string;
  start: string;
  end: string;
  hometeam_score: number;
  awayteam_score: number;
  createdAt: string;
  updatedAt: string;
  hometeam_id: number;
  awaytema_id: number;
  hometeam: any;
  awayteam: any;
};

export type FixturesType = {
  games: [FixturesItemType];
};

export type GameweeksType = [
  {
    id: string;
    name: string;
    start: string;
    end: string;
    createdAt: string;
    updatedAt: string;
  },
];
