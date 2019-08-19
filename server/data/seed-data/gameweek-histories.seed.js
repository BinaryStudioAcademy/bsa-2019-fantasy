const now = new Date();

export default new Array(100).fill({}).map((history) => ({
  ...history,
  team_score: 0,
  createdAt: now,
  updatedAt: now,
}));
