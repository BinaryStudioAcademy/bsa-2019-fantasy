export type Fixture = {
  start: string;
  opp: string;
  round: number;
};

export type FixtureSubscribtion = {
  id: string;
  user_id: string;
  game_id: string;
};

export type UpcomingFixture = {
  fixture: string;
  start: string;
  isHome: boolean;
};
