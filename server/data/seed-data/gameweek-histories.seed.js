const now = new Date();

export default new Array(100).fill({}).map(history => ({
  ...history,
  createdAt: now,
  updatedAt: now
}));
