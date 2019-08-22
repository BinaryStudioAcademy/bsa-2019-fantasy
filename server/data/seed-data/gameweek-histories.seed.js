const now = new Date();
const score = [54, 72];
export default new Array(2).fill({}).map((history, index) => ({
  ...history,
  team_score: score[index],
  createdAt: now,
  updatedAt: now,
}));
