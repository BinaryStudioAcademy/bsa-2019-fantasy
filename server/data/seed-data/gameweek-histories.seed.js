const now = new Date();

export default [{}, {}, {}].map(history => ({
  ...history,
  createdAt: now,
  updatedAt: now
}));
