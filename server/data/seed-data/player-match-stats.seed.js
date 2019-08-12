const now = new Date();

export default [
  {
    goals: 0,
    assists: 10,
    missed_passes: 0,
    goals_conceded: 2,
    saves: 6,
    yellow_cards: 0,
    red_cards: 0
  },
  {
    goals: 1,
    assists: 20,
    missed_passes: 3,
    goals_conceded: 0,
    saves: 0,
    yellow_cards: 1,
    red_cards: 0
  },
  {
    goals: 0,
    assists: 30,
    missed_passes: 4,
    goals_conceded: 0,
    saves: 0,
    yellow_cards: 0,
    red_cards: 0
  }
].map(stats => ({
  ...stats,
  createdAt: now,
  updatedAt: now
}));
